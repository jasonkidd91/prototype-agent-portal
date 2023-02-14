import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UtilityService } from './utility.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(
    private storage: AngularFireStorage,
    private util: UtilityService
  ) { }

  uploadLoanApplicationDocument(loanId: string, file: File) {
    const path = `loans/${loanId}/${this.util.randomString}_${file.name}`;
    return this.fireStorageUpload(file, path);
  }

  private fireStorageUpload(file: File, path: string) {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(path);
      const upload = ref.put(file);
      const sub = upload.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const url = await ref.getDownloadURL().toPromise();
            resolve({ url });
          } catch (err) {
            reject(err);
          }
          sub.unsubscribe();
        })
      ).subscribe();
    });
  }

  removefileByUrl(url: string) {
    return this.storage.storage.refFromURL(url).delete();
  }
}