import { Injectable, signal, computed } from '@angular/core';
import { Residu, EstatResidu } from '../models/residu.model';

@Injectable({
  providedIn: 'root'
})
export class ResidusService {
  private nextId = 6;

  // Estat reactiu amb signals d'Angular
  private _residus = signal<Residu[]>([
    { id: 1, nom: 'Oli de motor usat',     tipus: 'Perillós',   pes: 12.5, data: '2025-01-10', estat: 'Pendent'   },
    { id: 2, nom: 'Cartró i paper',         tipus: 'Reciclable', pes: 34.0, data: '2025-01-11', estat: 'Processat' },
    { id: 3, nom: 'Bateries de plom-àcid', tipus: 'Perillós',   pes: 8.2,  data: '2025-01-12', estat: 'Pendent'   },
    { id: 4, nom: 'Plàstic industrial',    tipus: 'Reciclable', pes: 22.7, data: '2025-01-13', estat: 'Pendent'   },
    { id: 5, nom: 'Residus sanitaris',     tipus: 'Especial',   pes: 5.1,  data: '2025-01-14', estat: 'Processat' },
  ]);

  readonly residus = this._residus.asReadonly();

  readonly pendents = computed(() =>
    this._residus().filter(r => r.estat === 'Pendent')
  );

  readonly total = computed(() => this._residus().length);
  readonly totalPendents = computed(() => this.pendents().length);
  readonly pesTotal = computed(() =>
    this._residus().reduce((acc, r) => acc + r.pes, 0)
  );

  afegirResidu(dades: Omit<Residu, 'id'>): void {
    const nou: Residu = { id: this.nextId++, ...dades };
    this._residus.update(llista => [...llista, nou]);
  }

  actualitzarEstat(id: number, estat: EstatResidu): void {
    this._residus.update(llista =>
      llista.map(r => r.id === id ? { ...r, estat } : r)
    );
  }

  eliminarResidu(id: number): void {
    this._residus.update(llista => llista.filter(r => r.id !== id));
  }
}
