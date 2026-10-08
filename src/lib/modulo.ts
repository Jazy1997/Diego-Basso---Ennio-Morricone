// Modulo contatti (ARCHITECTURE.md §8, §15): schema e codici d'errore condivisi tra endpoint e modulo.
import { z } from 'astro/zod';

export const MOTIVI = ['booking', 'stampa', 'pubblico'] as const;
export type Motivo = (typeof MOTIVI)[number];

export const LIMITI = { nome: 100, email: 200, messaggio: 5000 } as const;

export const schemaModulo = z.object({
  nome: z.string().trim().min(1, 'nome').max(LIMITI.nome, 'nome'),
  email: z.string().trim().pipe(z.email('email').max(LIMITI.email, 'email')),
  motivo: z.enum(MOTIVI, { message: 'motivo' }),
  messaggio: z.string().trim().min(10, 'messaggio').max(LIMITI.messaggio, 'messaggio'),
  privacy: z.literal('si', { message: 'privacy' }),
  lang: z.enum(['it', 'en']).default('it'),
});

export type CampoModulo = 'nome' | 'email' | 'motivo' | 'messaggio' | 'privacy';
/** Errori generali (non legati a un campo). */
export type ErroreModulo = 'frequenza' | 'invio' | 'configurazione';
