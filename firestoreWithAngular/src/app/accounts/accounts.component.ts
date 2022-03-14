import { Component } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/compat/firestore";

export interface ITask {
  TaskName: string
  Due: string
  Ends: string
  Status: string
}

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
})
export class AccountsComponent {
  public tasksByLocation: ITask[] = [];
  private tasksDB: AngularFirestoreCollection<ITask[]>;

  constructor(private afs: AngularFirestore) {
    const orgId = 'bQ9CHs0Zc2xZt4zYVumI';
    const locationId = 'R3hdMx59LpEIlinlL45p';
    this.tasksDB = this.afs.collection<ITask[]>('accounts').doc(orgId).collection('locations').doc(locationId).collection('tasks');
    this.setupLocationDbListener();
  }

  private setupLocationDbListener(): void {
    this.tasksDB.valueChanges().subscribe((response: ITask[] | any) => {
      this.tasksByLocation = response;
    })
  }
}