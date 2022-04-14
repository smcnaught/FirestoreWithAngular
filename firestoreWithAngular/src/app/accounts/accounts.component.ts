import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore, DocumentReference, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { Subscription } from "rxjs";

export enum TaskTemplateType {
  form = 1, // This is a task template of type 'FORM', NOT a Form Template
  checklist = 2
}

export interface ITask {
  Name: string
  DueDate: string
  ExpireDate: string
  CurrentStatus: string
  ID: string; // id of document in firestore
  OrgID: number;
  LocationID: number;
  TaskType: TaskTemplateType;
  TaskTypeID: number;
  Description: string;
  AvailableDate: string;
  AvailableTime: string;
  DueTime: string;
  ExpireTime: string;
  CompletedDate: string;
	CompletedTime: string;
  Completed: boolean;
  CompletedBy: number; // user-id
  CreatedBy: number; // user-id
	DriveIDs: number[];
	TaskTemplateID: number;
	Drives: [];
  CompletedOnTime: boolean;
  Expired: boolean;
  AssignedRoles: [];
  AssignedUsers: [];
  SubTaskList: [];
  ItemsComplete: number;
  ItemsTotal: number;
  ItemsCompletedLate: number;
  ItemsRemaining: number;
  ItemsExpired: number;
	TotalRows: number;
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

  private orgId = '19';
  private locationId = '35';
  private subscriptions = new Subscription();

  constructor(private afs: AngularFirestore) {}
  
  public ngOnInit(): void {
    this.setupLocationDbListener();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getTaskByID(taskID: string): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection(false);
    const getTaskSub = tasksCollection
      .doc(taskID)
      .get()
      .subscribe((response: DocumentSnapshot<ITask> | any) => {
        const task: ITask = response.data();
      })

    this.subscriptions.add(getTaskSub);
  }

  public createTask(): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection(false);
    const newTask: ITask = {
      Name: "April 12 Task",
      DueDate: "2022-05-15",
      ExpireDate: "",
      CurrentStatus: "Open",
      ID: null,
      OrgID: +this.orgId,
      LocationID: +this.locationId,
      TaskType: 2,
      TaskTypeID: 2,
      Description: 'my task',
      AvailableDate: "2022-04-12",
      AvailableTime: '08:44',
      DueTime: '',
      ExpireTime: '',
      CompletedDate: '',
      CompletedTime: '',
      Completed: false,
      CompletedBy: null, // user-id
      CreatedBy: null, // user-id
      DriveIDs: [],
      TaskTemplateID: null,
      Drives: [],
      CompletedOnTime: null,
      Expired: false,
      AssignedRoles: [],
      AssignedUsers: [],
      SubTaskList: [],
      ItemsComplete: null,
      ItemsTotal: null,
      ItemsCompletedLate: null,
      ItemsRemaining: null,
      ItemsExpired: null,
      TotalRows: null,
    }

    tasksCollection.add(newTask)
    .then((response: DocumentReference) => {
      this.updateTask(response.id, { ID: response.id })
    })
  }

  public updateTask(taskID: string, taskDataToUpdate: IUpdateTask): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection(false);
    tasksCollection
      .doc(taskID)
      .set(taskDataToUpdate as ITask, { merge: true }); // Change some properties without passing up the entire object. 
  }

  public deleteTask(taskID: string): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection(false);
    tasksCollection.doc(taskID).delete();
  }

  private setupLocationDbListener(): void {
    const tasksCollection: AngularFirestoreCollection<ITask> = this.getTasksCollection(true);
    const tasksDBSub = tasksCollection
      .valueChanges()
      .subscribe((response: ITask[] | any) => {
        this.tasksByLocation = response;
      })

    this.subscriptions.add(tasksDBSub);
  }

  private getTasksCollection(byDateRange: boolean): AngularFirestoreCollection<ITask> {
    const locationDoc = this.afs.collection('accounts').doc(this.orgId).collection('locations').doc(this.locationId);

    if (byDateRange) {
      const startDate = "2022-04-11";
      let endDate;
  
      return locationDoc
        .collection('tasks', tasks => tasks
        .where('AvailableDate', '>=', startDate)
        .where('AvailableDate', '<=', endDate || startDate)) // if no end date, get single day of tasks
    }
    else {
      return locationDoc.collection('tasks');
    }
  }
}