import { Component, OnInit, Input, ElementRef, SimpleChanges,
         Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject, Subscription, Observable, merge } from 'rxjs';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { isEmpty, get, set } from 'lodash';
import { debounceTime, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, OnChanges {
  change: Subject<any> = new Subject<any>();
  save: Subject<any> = new Subject<any>();

  change$: Subscription;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: any;

  separatorKeysCodes = [ENTER, COMMA, SPACE];
  cache: any = {};

  //test
  //text = `<div style='color:blue'>This is a text</div>`;
  text = `<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>No</th><th>Chemical List</th><th>[Cas]</th><th>Eight-hour time-weitghted Average airborne concerntration</th><th>&nbsp;</th><th>Ceiling Limit airborne concerntration</th><th>&nbsp;</th><th>Remark</th></tr></thead><tbody>
 <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>ppm</td><td>mg/m3</td><td>ppm</td><td>mg/m3</td><td>&nbsp;</td></tr>
 <tr><td>1</td><td>Acetaldehyde</td><td>[75-07-01]</td><td>&nbsp;</td><td>&nbsp;</td><td>25</td><td>45</td><td>&nbsp;</td></tr>
 <tr><td>2</td><td>Acetic Acid</td><td>[64-19-7]</td><td>10</td><td>25</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>3</td><td>Acetone</td><td>[67-64-1]</td><td>500</td><td>1187</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>4</td><td>Aceton Cyanohydrin as CN- (skin)</td><td>[75-86-5]</td><td>&nbsp;</td><td>&nbsp;</td><td>4.7</td><td>5</td><td>&nbsp;</td></tr>
 <tr><td>5</td><td>acetonitrile</td><td>[75-05-8]</td><td>40</td><td>67</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>6</td><td>acetophenone</td><td>[98-66-2]</td><td>10</td><td>49</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>7</td><td>acetylenedichloride, see 1, 2-dichloroethylene </td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>8</td><td> tetrabromide</td><td>[79-27-6]</td><td>1</td><td>14</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>9</td><td>acetylsalicylic acid (asprin)</td><td>[50-78-2]</td><td>-</td><td>5</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>10</td><td>acrolein - (skin)</td><td>[107-02-8]</td><td>-</td><td>-</td><td>0.1</td><td>0.23</td><td>&nbsp;</td></tr>
 <tr><td>11</td><td>acrylamide - (skin)</td><td>[79-06-01]</td><td>-</td><td>0.03</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>12</td><td>acrylic acid (skin)</td><td>[79-10-7]</td><td>2</td><td>5.9</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>13</td><td>acrylonitrile - (skin)</td><td>[107-13-1]</td><td>2</td><td>4.3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>14</td><td>adipic acid</td><td>[124-04-9]</td><td>-</td><td>5</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>15</td><td>adiponitrile- (skin)</td><td>[111-69-3]</td><td>2</td><td>8.8</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>16</td><td>Aldrin</td><td>[309-00-2]</td><td>-</td><td>0.25</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>17</td><td>allyl alcohol - (skin)</td><td>[107-18-6]</td><td>0.5</td><td>1.2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>18</td><td>allyl chloride</td><td>[107-05-1]</td><td>1</td><td>3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>19</td><td>allyl glycidyl ether (AGE)</td><td>[106-92-3]</td><td>1</td><td>4.6</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>20</td><td>allyl propyl disulphide</td><td>[2179-59-1]</td><td>2</td><td>12</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>21</td><td>oc-Alumins, see aluminium oxide</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>22</td><td>Aluminium</td><td>[7429-90-5]</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>23</td><td>Metal Dust</td><td>&nbsp;</td><td>-</td><td>10</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>24</td><td>Pyro Powders, as Al</td><td>&nbsp;</td><td>-</td><td>5</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>25</td><td>Welding Fumes, as Al</td><td>&nbsp;</td><td>-</td><td>5</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>26</td><td>soluble salt, as Al</td><td>&nbsp;</td><td>-</td><td>2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>27</td><td>alkyls (NOC), as Al</td><td>&nbsp;</td><td>-</td><td>2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>28</td><td>Aluminium oxide</td><td>[1344-2B-1]</td><td>-</td><td>10</td><td>&nbsp;</td><td>&nbsp;</td><td>The value is for particulate matter containing no asbestos and <1% crystaline silica</td></tr>
 <tr><td>29</td><td>4-aminobiphenyl- (skin)</td><td>[92-67-1]</td><td>-</td><td>-</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>30</td><td>2-aminoethanol, see ethanolamine</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>31</td><td>2-aminopyridine</td><td>[504-29-0]</td><td>0.5</td><td>1.9</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>32</td><td>3-amino-1 2 4-triazole, see altmile</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>33</td><td>amitrole</td><td>[61-82-5]</td><td>-</td><td>0.2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>34</td><td>ammonia</td><td>[7664-41-7]</td><td>25</td><td>17</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>35</td><td>ammonium chloride fume</td><td>[12125-02-9]</td><td>-</td><td>10</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>36</td><td>ammonium</td><td>[3825-26-1]</td><td>-</td><td>0.01</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>37</td><td>perfluorooctane - (skin)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>38</td><td>Ammonium sulfamate</td><td>[7773-06-0]</td><td>-</td><td>10</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>39</td><td>Amosite, see asbestos</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>40</td><td>n-Amyl acetate</td><td>[628-63-7]</td><td>100</td><td>532</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>41</td><td>sec-amyl acetate</td><td>[626-38-0]</td><td>125</td><td>665</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>42</td><td>aniline and homologous - (skin)</td><td>[62-53-3]</td><td>2</td><td>7.6</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
 <tr><td>43</td><td>o-anisidine - (skin)</td><td>[90-04-0]</td><td>0.1</td><td>0.5</td><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>
</tbody></table>`;

  constructor(private el: ElementRef,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.change$ = merge(
        this.change.pipe(debounceTime(1000)),
        this.save
    ).pipe(
      distinct((v: any) => {
        return `${v.id}${v.text}${get(v, 'tags', []).join('')}`;
      })
    ).subscribe((v) => {
      this._save(v.id, v.text, v.tags);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( !isEmpty(this.cache) ) {
      this.save.next(this.cache);
    }
  }

  _save(id: string, text: string, tags: string[]) {
    // this._list
    //   .saveText(id, text, tags)
    //   .subscribe(() => {
    //     this.cache = {};
    //     this.update.emit({ id: id, text: text, tag: tags });
    //   });
  }

  edit() {
    this.cache = {
      text: get(this.content, 'data.text' , ''),
      tags: get(this.content, 'data.tag' , []),
      id: this.content.id
    };

    this.change.next(this.cache);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const tags = get(this.content, 'data.tag' , []);

    if ((value || '').trim()) {
      tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    set(this.content, 'data.tag', tags);
    this.edit();
  }

  removeTag(tag: any): void {
    const tags = get(this.content, 'data.tag' , []);
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }

    set(this.content, 'data.tag', tags);
    this.edit();
  }
}
