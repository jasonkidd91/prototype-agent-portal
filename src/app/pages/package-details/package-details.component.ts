import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Packages } from 'src/app/models/packages';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<PackageDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Packages
  ) { }

  ngOnInit() {
  }

  applyLoan() {
    this.router.navigate(['../apply-loan', { packages: JSON.stringify(this.data) }], { relativeTo: this.route });
    this.dialogRef.close();
  }
}