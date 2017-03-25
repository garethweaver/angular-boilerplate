import { Component } from '@angular/core'

@Component({
  selector: 'root-component',
  templateUrl: './app/components/root.component.html',
  styleUrls: ['./app/components/root.component.css']
})

export class RootComponent {
  name: string = 'Foobar'
}
