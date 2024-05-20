import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class TeamRegisterComponent implements OnInit {

  members: string[] = [];

  ngOnInit(): void {
    console.log('component initialized')
  }

  searchTeamMember(member: string) {
    this.members.push(member)
  }

  removeTeamMember(member: string) {
    this.members = this.members.filter(foo => foo !== member);
  }

  registerTeam() {
    alert('registering team')
  }

}
