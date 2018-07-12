import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { each, remove, find, isArray } from 'lodash';

import {MatTableModule} from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @Input() lists: any[] = [];
    change: Subject<boolean> = new Subject();
    change$: Subscription;
    @Output() highlight: EventEmitter<any> = new EventEmitter<any>();
    @Input() keyword: string;
    @Input() categoryId: string;
    @Input() selectedId: string;

    t = '';

    public completeText = '';

    constructor() { }

    ngOnInit() {
      this.change$ = this.change.pipe(
          debounceTime(1000)
        ).subscribe(() => {
        each(this.lists, (list) => {
          console.log(list);
          if (list.edit === true ) {
            // this._list.edit(this.categoryId, list.id, list.name).subscribe(() => {
            //   list.edit = false;
            // });
          }

          if (list.id === this.selectedId) {
            list = this.buildComplteText(list);
          }
        });
      });

      this.lists = [
        {
          id: 2,
          name: 'Testing',
          data: {
            subtext: [
              {
                type: 'text',
                subtext: 'Paragrah 1'
              },
              {
                type: 'table',
                subtext: `<table style='width:100%;border:1px solid black'>
                    <caption>Table 1: Testing</caption>
                    <tr><th>Col 1</th><th>Col 2</th></tr>
                    <tr><td>Data 1</td><td>Data 2</td></tr>
                </table>`
              },
              {
                type: 'text',
                subtext: 'Paragrah 2'
              },
              {
                type: 'image',
                subtext: '<div><img width:100% src=\'http://www.markramseymedia.com/wp-content/uploads/2012/02/oneperson.jpg\'></img></div>'
              },
            ],
            tag: [
              'tag1',
              'tag2'
            ]
          }
        },
        {
          'id': 3,
          'name': 'Regulation 1. Citation and commencement. ',
          'data': {
            subtext: [
              {
                type: 'text',
                subtext: 'These regulations may be cited as the Occupational Safety and Health (Safety and Health Officer)\nRegulations 1997 and shall come into force on 22 August 1997.'
              }
            ],
            'tag': [
              'SHO Regulation'
            ]
          }
        },
        {
          'id': 4,
          'name': 'Regulation 2. Interpretation. ',
          'data': {
            // "text": "<div id='table1'></div>In these Regulations, unless the context otherwise requires\n\n\"**continuous education programme**\" means a course, seminar, conference or other education\nprogramme in occupational safety and health or the equivalent thereof, approved by the Director\nGeneral;\n\n\"**Director General**\" means the Director General of Occupational Safety and Health appointed under\nsubsection 5(1) of the Act;\n\n\"**lost-time injury**\" means an injury which prevents any worker from performing normal work and leads\nto a permanent or temporary incapacity of work;\n\n\"**near-miss accident**\" means any accident at a place of work which has the potential of causing injury\nto any person or damage to any property;\n\n\"**no lost-time injury**\" means an injury where no work is lost beyond that required for medical attention.  ",
            subtext: [
              {
                type: 'text',
                'subtext': '<div id=\'table1\'></div>In these Regulations, unless the context otherwise requires\n\n"**continuous education programme**" means a course, seminar, conference or other education\nprogramme in occupational safety and health or the equivalent thereof, approved by the Director\nGeneral;\n\n"**Director General**" means the Director General of Occupational Safety and Health appointed under\nsubsection 5(1) of the Act;\n\n"**lost-time injury**" means an injury which prevents any worker from performing normal work and leads\nto a permanent or temporary incapacity of work;\n\n"**near-miss accident**" means any accident at a place of work which has the potential of causing injury\nto any person or damage to any property;\n\n"**no lost-time injury**" means an injury where no work is lost beyond that required for medical attention.  ',
              }
            ],
            'tag': [
              'SHO regulation',
              'CEP',
              'definition',
              'continuous education programme',
              'definitions of'
            ]
          }
        },
        {
          'id': 5,
          'name': 'Regulation 3. Application. ',
          'data': {
            'text': 'These Regulations shall apply to\n\n(a) a person who acts as a **safety and health officer** required under the Act or any regulations\nmade under the Act; and\n\n(b) an **employer of the class or description of industries** who are required to employ safety\nand health officer under the Act.   ',
            'tag': [
              'SHO Regulation'
            ]
          }
        },
        {
          'id': 6,
          'name': 'Regulation 4. Registration. ',
          'data': {
            'text': 'No person shall act as a safety and health officer unless he is registered with the Director General.',
            'tag': [
              'SHO Regulation'
            ]
          }
        },
        {
          'id': 8,
          'name': 'Regulation 6. Qualification for registration. ',
          'data': {
            'text': '(1) A person who-\n\n(a) holds a **diploma in occupational safety and health** or the **equivalent** thereof from any professional body or institution, approved by the Minister, on the recommendation of the Director General;\n\n(b) has successfully **completed a course of training** in occupational safety and health and **passed any examination** for that course or the equivalent thereof, **approved by the Minister**, on the recommendation of the Director General, and has a **minimum of three years experience** in occupational safety and health;\n\n(c) has been **working in the area of occupational safety and health** at least for a period of **ten years**; or\n\n(d) holds such other qualification or has received such training as prescribed from time to time by the Minister pursuant to subsection 29(4) of the Act,\nshall be entitiled, on application made by him, to be registered as a safety and health officer.\n\n(2) Notwithstanding subsection (1), a person shall **not be entitled to be registered** as a safety and health officer if at the time of the application for registration he has been-\n\n(a) **convicted of any offence** under the Act or any regulations made under the Act; or\n(b) convicted of any offence and sentence to **more than one year imprisonment** or a **fine of\nmore than two thounsand ringgit**; and\n(c) declared as a **bankrupt**.\n\n(3) For the purpose of subparagraph (1)(b), the Safety and Health Officer course conducted by the\n**National Institute of Occupational Safety and Health**, Malaysia is one of the approved course.',
            'tag': [
              'SHO Regulation',
              'NIOSH',
              'become sho',
              'qualification of sho'
            ]
          }
        },
        {
          'id': 9,
          'name': 'Regulation 7. Certificate of registration. ',
          'data': {
            'text': 'The Director General shall issue to an applicant whose application for registration as a safety and health officer has been approved, a certificate of registration in the prescribed form.',
            'tag': [
              'SHO Regulation'
            ]
          }
        },
        {
          'id': 11,
          'name': 'Regulation 8. Compulsory attendance in any continuous education programme for renewal of registration purposes. ',
          'data': {
            'text': 'A person who is registered as a safety and health officer shall attend any continous education programme at least once in a year for the purpose of renewal of registration.\n',
            'tag': [
              'SHO Regulation',
              'CEP',
              'Training',
              'renew sho license',
              'green book'
            ]
          }
        },
        {
          'id': 12,
          'name': 'Regulation 9. Refusal to register. ',
          'data': {
            'text': 'The Director General may refuse to register any application for registration made under regulation 5 if he is satisfied that the applicant does not meet the requirements stipulated under these Regulations or any order made by the Minister.',
            'tag': [
              'SHO Regulation'
            ]
          }
        },
        {
          'id': 13,
          'name': 'Regulation 10. Duration of registration. ',
          'data': {
            'text': 'The registration as a safety and health officer shall be **valid for a period of three years from the date of registration**, unless it is cancelled earlier under these Regulations.',
            'tag': [
              'SHO Regulation',
              'duration for sho license',
              'green book'
            ]
          }
        },
        {
          'id': 14,
          'name': 'Regulation 11. Renewal of registration. ',
          'data': {
            'text': 'An application for the renewal of registration as a safety and health officer shall be made in the prescribed Form specified in Schedule II accompanied with a processing **fee of fifty ringgit**.',
            'tag': [
              'SHO Regulation',
              'sho renewal fee'
            ]
          }
        },
        {
          'id': 15,
          'name': 'Regulation 12. Director General may refuse to renew registration. ',
          'data': {
            'text': 'The Director General may refuse to renew registration made under regulation 11 if the applicant- \n\n(a) has **ceased to become** a safety and health officer;\n\n(b) is a registered safety and health officer who **has not been** appointed as a safety and health officer under the Act since his registration or renewal;\n\n(c) has **not met any requirements** stipulated under these Regulations;\n\n(d) has **failed to conduct his duties** as stipulated under the Act or any regulations made under\nthe Act; or\n\n(e) has **not shown any evidence** that he has attended any continuous education programme or the equivalent thereof in the last three years as required under regulation 8.\n',
            'tag': [
              'SHO Regulation',
              'fail to renew',
              'green book',
              'SHO license'
            ]
          }
        },
        {
          'id': 16,
          'name': 'Regulation 13. Cancellation of registration. ',
          'data': {
            'text': 'The Director General may cancel the registration of a safety and health officer at any time, if he finds that the safety and health officer-\n\n(a) has **ceased to become** a safety and health officer;\n\n(b) has been **convicted of any offence** under the Act or any regulations made under the Act;\n\n(c) has **not met any requirements** stipulated under these Regulations or any order made by the Minister under subsection 29(4) of the Act; or\n\n(d) has obtained registration by **misrepresentation** or **fraud**.',
            'tag': [
              'SHO Regulation',
              'green book'
            ]
          }
        },
        {
          'id': 17,
          'name': 'Regulation 14. Notification of person employed as a safety and health officer. ',
          'data': {
            'text': 'An **employer shall notify in writing** to the Director General **within one month** of any- \n\n(a) appointment of a safety and health officer; or\n\n(b) termination or resignation of a safety and health officer.',
            'tag': [
              'SHO Regulation',
              'employer duty'
            ]
          }
        },
        {
          'id': 18,
          'name': 'Regulation 15. Facilities. ',
          'data': {
            'text': 'An **employer** of a place of work **shall provide** the safety and health officer employed by him adequate **facilities**, including **training equipment**, and **appropriate information** to enable the safety and health officer to conduct his duties as required under the Act.',
            'tag': [
              'SHO Regulation',
              'duties',
              'employer duty'
            ]
          }
        },
        {
          'id': 19,
          'name': 'Regulation 16. Continuous education programme. ',
          'data': {
            'text': 'An **employer** shall permit the safety and health officer **at least once in a year** to attend any continuous education programme to enhance his knowledge on occupational safety and health.',
            'tag': [
              'SHO Regulation',
              'CEP',
              'continuous education programme'
            ]
          }
        },
        {
          'id': 20,
          'name': 'Regulation 17. Investigation into any accident, etc. ',
          'data': {
            'text': 'An **employer shall direct one supervisor** or who has direct control on person or activity of the place of work **to assist the safety and health officer in any investigation** of accident, near-miss accident, dangerous occurrence, occupational poisoning or occupational disease.',
            'tag': [
              'SHO Regulation',
              'employer duty'
            ]
          }
        },
        {
          'id': 21,
          'name': 'Regulation 18. Duties of safety an d health officers. ',
          'data': {
            'text': 'It shall be the duty of a safety and health officer-\n\n(a) **to advise the employer** or any person in charge of a place of work on the measures to be taken in the interests of the safety and health of the persons employed in the place of work;\n\n(b) **to inspect the place of work** to determine whether any machiney, plant, equipment, substance, appliances or process or any description of manual labour used in the place of work, is of such nature liable to cause bodily injury to any person working in the place of work;\n\n(c) **to investigate** any accident, near-miss accident, dangerous occurrence, occupational poisoning or accupational disease\nwhich has happened in the place of work;\n\n(d) **to assist the employer** or the safety and health committee, if any, pursuant to regulation 11 of the Occupational Safety and Health (Safety and Health Committee) Regulations 1996 [P.U.(A) 616/96] in **organizing and implementing occupational safety and health programme** at the place of work;\n\n(e) **to become secretary to the safety and health committee**, if any, as specified under subregulation 6(2) of the Occupational Safety and Health (Safety and Health Committee) Regulations 1996, and perform all functions of a secretary as specified in that Regulations;\n\n(f) **to assist the safety and health committee in any inspection** of the place of work for the **purposes of checking the effectiveness and efficiency of any measures** taken in compliance with the Act or any regulations made under the Act;\n\n(g) **to collect, analyse and maintain statistics** on any accident, dangerous occurance, occupational poisoning and occupational disease which have occured at the place of work;\n\n(h) **to assist any officer** in carrying made by the employer or any person in charge of the place of work on any matters pertaining to safety and health of the place of work.',
            'tag': [
              'SHO Regulation',
              'duty of sho',
              'safety advisor',
              'Investigator',
              'Inspector',
              'SHO'
            ]
          }
        },
        {
          'id': 22,
          'name': 'Regulation 19. Safety and health officer to submit report. ',
          'data': {
            'text': '(1) A safety and health officer shall, **before the tenth of a preceding month**, **submit a report** pertaining to his activities to the employer.\n\n(2) The report submitted under subregulation (1) shall contain, but no limited to the following particulars:\n\n(a) **any action to be taken by the employer** in order **to comply** with the requirements of the Act or any regulations made under the Act;\n\n(b) **method of establishing and maintaining a safe and healthy working condition** in the place of work;\n\n(c) **the number and types of accident, near-miss accident, dangerous occurrence, occupational poisoning or occupational disease** which have occured in the place of work including the number of persons injured either incurring **lost-time injury** or no **lost-time injury**;\n\n(d) **any machinery, plant, equipment, appliance, substances or process or any description of manual labour used** in the place of work which is of such **nature liable to cause bodily injury** to any person working in the place of work;\n\n(e) any machinery, plant, equipment, appliance, or any personal protective equipment required for the **purpose of minimising any such risk**;\n\n(f) **recommend any alteration** to be made to the structure or layout of the place of work in the interests of the safety and health of the persons employed therein.\n\ng) any work related to safety and health which has been carried out by any persons, or group of persons, engaged by the employer in order **to promote safety and health in the place of work**;\n\n(h)** any outstanding matter** arising from the previous report specified under paragraphs (a) to (g); or\n\n(i) **any other matters** related to safety and health of persons working in the place of work.\n\n\n\n',
            'tag': [
              'SHO Regulation',
              'content',
              'SHO duty'
            ]
          }
        },
        {
          'id': 23,
          'name': 'Regulation 20. Action to be taken on report. ',
          'data': {
            'text': '(1) An employer or any person in charge of a place of work after receiving the report under regulation 19, shall **not later than two weeks** after the receipt discuss the report with the safety and health officer.\n\n(2) An employer or any person in charge of the place of work **shall countersign the report** in order to confirm that he has received it.\n\n(3) The report shall be kept in good condition at least for a period of **ten years** for the purpose of inspection or investigation by the officer if necessary.',
            'tag': [
              'SHO Regulation',
              'employer duty',
              'documentation'
            ]
          }
        },
        {
          'id': 24,
          'name': 'Regulation 21. Death, sickness and absence from work of a safety and health officer. ',
          'data': {
            'text': 'In a case of death, sickness or absence from work of a safety and health officer, the Director General may, notwithstanding the provisions of these Regulations, authorised the employer, by certificate in writing, allow work to be carried out for a period **not exceeding three calendar months** without the safety and health officer.',
            'tag': [
              'SHO Regulation',
              'employer duty'
            ]
          }
        },
        {
          'id': 25,
          'name': 'Regulation 5. Application for registration. ',
          'data': {
            'text': '(1) Each application for registration of a safety and health officer shall be made in the Form as\nspecified in Schedule I.\n\n(2) The application for registration shall be submitted to the Director general together with any\ndocument and information as are specified in the Form accompanied with a **processing fee of one\nhundred ringgit**.',
            'tag': [
              'SHO Regulation',
              'sho registration fee'
            ]
          }
        }
      ];
    }

    add(){
      this._list.create(this.categoryId, '').subscribe((v: any) => {
        this.lists.push(v);
      });
    }

    edit(list: any){
      list.edit = true;
      this.change.next(true);
    }

    delete(id: string, $event){
      this._list.delete(this.categoryId, id).subscribe(() => {
        remove(this.lists, (cat) => {
          return cat.id === id;
        });
      });
      $event.stopPropagation();
    }

    _select(data: any){
      console.log('select');
      if ( this.selectedId !== data.id){
        this.selectedId = data.id;

        each(this.lists, (item) => {
          if (item.id === data.id) {
            item = this.buildComplteText(data);
            console.log(item);
            return false;
          }

        });


        this.highlight.emit(data);
      }
    }

    ngOnDestroy(){
      this.change$.unsubscribe();
    }

    buildComplteText(targetList) {
      let completeText = '';
      if (targetList.data && targetList.data.subtext && isArray(targetList.data.subtext)) {
        each(targetList.data.subtext, (item) => {
          completeText += item.subtext;
        });
      }
      targetList.data.text = completeText; console.log(targetList);
      return targetList;
    }
}
