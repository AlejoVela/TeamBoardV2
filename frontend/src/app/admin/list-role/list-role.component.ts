import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { UpdateUserComponent } from "../update-user/update-user.component";
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  displayedColumns: string[] = ['NAME', 'DESCRIPTION', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    //private _updateU: UpdateUserComponent,
  ) {
    this.userData = {};
    this.dataSource = new MatTableDataSource(this.userData);
  }

  ngOnInit(): void {
    this._roleService.listRole('').subscribe(
      (res) => {
        console.log(res);
        
        this.userData = res.role;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }


  updateRole(user: any) {
    this._router.navigate(['/updateRole']);
    //this._updateU.registerData = user;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
