import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ResidusService } from '../../services/residus.service';
import { Residu } from '../../models/residu.model';

@Component({
  selector: 'app-residu-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './residu-form.component.html',
  styleUrls: ['./residu-form.component.scss']
})
export class ResiduFormComponent {
  private readonly servei = inject(ResidusService);

  @ViewChild('formulari') formulari!: NgForm;

  missatgeExit = signal(false);

  nouResidu: Omit<Residu, 'id'> = {
    nom: '',
    tipus: 'Reciclable',
    pes: 0,
    data: new Date().toISOString().split('T')[0],
    estat: 'Pendent'
  };

  enviar(): void {
    if (!this.nouResidu.nom || !this.nouResidu.pes) return;

    this.servei.afegirResidu({ ...this.nouResidu });
    this.netejar();
    this.mostrarExit();
  }

  netejar(): void {
    this.nouResidu = {
      nom: '',
      tipus: 'Reciclable',
      pes: 0,
      data: new Date().toISOString().split('T')[0],
      estat: 'Pendent'
    };
    this.formulari?.resetForm();
  }

  private mostrarExit(): void {
    this.missatgeExit.set(true);
    setTimeout(() => this.missatgeExit.set(false), 3000);
  }
}
