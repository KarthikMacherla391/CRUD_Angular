import { Component,OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'GATE';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob','gender','department','college','address','city','id','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _dialog: MatDialog,private _studentservice: StudentService,private_coreService: CoreService) {}
ngOnInit(): void {
 this.getStudentList();
}
  openAddEditForm(){
    const dialogRef =this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
         if (val){
          this.getStudentList();
         }

      }
    })
  }

  getStudentList(){
    this._studentservice.getStudentList().subscribe({
      next: (res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator

      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudentList(id: number){
    this._studentservice.deleteStudentList(id).subscribe({
       next:(res)=>{
      
        // this._coreService.openSnackBar('Student details deleted', 'done')
        
        this.getStudentList();

       },
       error:console.log,

    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(StudentAddEditComponent,{
       data,
    });

    dialogRef.afterClosed().subscribe({
      next:(val)=>{
         if (val){
          this.getStudentList();
         }

      }
    })
    
 
  }

}
