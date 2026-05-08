import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { ResidusService } from '../../services/residus.service';

@Component({
  selector: 'app-residu-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './residu-list.component.html',
  styleUrls: ['./residu-list.component.scss']
})
export class ResiduListComponent {
  readonly servei = inject(ResidusService);

  filtre = signal<'tots' | 'pendents'>('tots');

  mostrarTots = computed(() => this.filtre() === 'tots');

  residusMostrats = computed(() =>
    this.mostrarTots() ? this.servei.residus() : this.servei.pendents()
  );

  processar(id: number): void {
    this.servei.actualitzarEstat(id, 'Processat');
  }

  revertir(id: number): void {
    this.servei.actualitzarEstat(id, 'Pendent');
  }

  eliminar(id: number): void {
    if (confirm('Segur que vols eliminar aquest residu?')) {
      this.servei.eliminarResidu(id);
    }
  }
}
