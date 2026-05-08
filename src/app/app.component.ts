import { Component } from '@angular/core';
import { ResiduListComponent } from './components/residu-list/residu-list.component';
import { ResiduFormComponent } from './components/residu-form/residu-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResiduListComponent, ResiduFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  vistaActiva: 'llista' | 'nou' = 'llista';
}
