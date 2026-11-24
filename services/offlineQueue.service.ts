import { favoritesService } from '@/services/favorites.service';
import { db } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export type PendingActionType =
  | 'ADD_FAVORITE'
  | 'REMOVE_FAVORITE'
  | 'CREATE_ITINERARY';

export interface PendingAction {
  id: string;
  type: PendingActionType;
  userId: string;
  payload: any;
  createdAt: string;
}

const QUEUE_KEY = 'tlaxgo_offline_queue_v1';

const notifyQueueUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tlaxgo-queue-updated'));
  }
};

export const offlineQueueService = {
  getQueue(): PendingAction[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    } catch {
      return [];
    }
  },

  enqueue(action: Omit<PendingAction, 'id' | 'createdAt'>) {
    const queue = this.getQueue();
    const newItem: PendingAction = {
      ...action,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    queue.push(newItem);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    notifyQueueUpdated();
    return newItem;
  },

  saveQueue(queue: PendingAction[]) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    notifyQueueUpdated();
  },

  async flushQueue(): Promise<{ synced: number; remaining: number }> {
    if (typeof window === 'undefined' || !navigator.onLine) {
      return { synced: 0, remaining: this.getQueue().length };
    }

    const queue = this.getQueue();
    if (queue.length === 0) return { synced: 0, remaining: 0 };

    const remaining: PendingAction[] = [];
    let synced = 0;

    for (const item of queue) {
      try {
        if (item.type === 'ADD_FAVORITE') {
          await favoritesService.addFavorite(
            item.userId,
            item.payload.placeId,
            item.payload.placeData
          );
        } else if (item.type === 'REMOVE_FAVORITE') {
          await favoritesService.removeFavorite(item.userId, item.payload.placeId);
        } else if (item.type === 'CREATE_ITINERARY') {
          // Ajusta la colección si tus itinerarios viven en otra ruta de Firestore
          const itinerariesRef = collection(db, 'users', item.userId, 'itineraries');
          await addDoc(itinerariesRef, {
            ...item.payload,
            syncedFromOffline: true,
            syncedAt: new Date().toISOString(),
          });
        }
        synced += 1;
      } catch (err) {
        console.error('Error sincronizando acción pendiente, se reintentará luego:', err);
        remaining.push(item);
      }
    }

    this.saveQueue(remaining);
    return { synced, remaining: remaining.length };
  },
};