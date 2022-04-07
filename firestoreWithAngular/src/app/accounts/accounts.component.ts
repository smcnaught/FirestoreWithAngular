import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import { Subscription } from "rxjs";

export interface ITask {
  Name: string
  DueDate: string
  ExpireDate: string
  CurrentStatus: string
  ID: string; // id of document in firestore
}

export interface IUpdateTask {
  Name?: string
  DueDate?: string
  ExpireDate?: string
  CurrentStatus?: string
  ID?: string; // id of document in firestore
}

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnInit, OnDestroy {
  public tasksByLocation: ITask[] = [];

  private orgId = '96';
  private locationId = '107';
  private subscriptions = new Subscription();

  constructor(private afs: AngularFirestore) {}
  
  public ngOnInit(): void {
    this.setupLocationDbListener();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public createTask(): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection();
    const newTask: ITask = {
      Name: "My New Task",
      DueDate: "2022-08-04",
      ExpireDate: "2022-03-09",
      CurrentStatus: "Open",
      ID: null
    }

    tasksCollection.add(newTask)
    .then((response: DocumentReference) => {
      this.updateTask(response.id, { ID: response.id })
    })
  }

  public updateTask(taskID: string, taskDataToUpdate: IUpdateTask): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection();
    tasksCollection
      .doc(taskID)
      .set(taskDataToUpdate as ITask, { merge: true }); // Change some properties without passing up the entire object. 
  }

  public deleteTask(taskID: string): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection();
    tasksCollection.doc(taskID).delete();
  }

  private setupLocationDbListener(): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection();
    const tasksDBSub = tasksCollection
      .valueChanges()
      .subscribe((response: ITask[] | any) => {
        this.tasksByLocation = response;
      })

    this.subscriptions.add(tasksDBSub);
  }

  private getTasksCollection(): AngularFirestoreCollection<ITask> {
    return this.afs
      .collection('accounts')
      .doc(this.orgId)
      .collection('locations')
      .doc(this.locationId)
      .collection('tasks')
  }
}