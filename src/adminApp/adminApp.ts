import { Component } from "@angular/core";
import { dashBoardComponent } from "./features/dashBoard/dashBoard.component";

@Component({
  selector: 'admin-app',
  standalone: true,
  imports: [dashBoardComponent],
  templateUrl: './adminApp.html',
  styleUrl: './adminApp.scss'
})
export class adminApp {
    // Component is now properly configured without error-throwing methods
}