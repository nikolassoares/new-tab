import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

import { SimpleImage } from './simple-img';

@Component({
  selector: 'app-ngx-editorjs',
  templateUrl: './ngx-editorjs.component.html',
  styleUrls: ['./ngx-editorjs.component.css']
})
export class NgxEditorjsComponent implements OnInit {
 @ViewChild('vc', {read: ViewContainerRef}) viewContainer: ViewContainerRef;

  constructor() { }

  ngOnInit() {
      const editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        // holderId: this.viewContainer,
          /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
          header: Header,
          list: List,
          // image: SimpleImage
        },

      });
  }

}
