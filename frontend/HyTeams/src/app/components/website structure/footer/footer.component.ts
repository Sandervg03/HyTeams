import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  copyDiscord() {
    navigator.clipboard.writeText("birbyontwitch");
    alert("Discord username copied to clipboard!");
  }

}
