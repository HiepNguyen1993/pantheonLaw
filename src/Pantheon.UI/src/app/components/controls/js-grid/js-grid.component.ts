import { filter } from 'lodash';
import { Title } from '@angular/platform-browser';
import { _translations } from './../../../translate/translations';
import { element } from 'protractor';
import { TranslateService } from 'app/translate';
import { PageModel } from 'app/common/models';
import { PageResponse } from './../../../common/models';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { Common } from '../../../common/index';
import { HttpService } from '../../../../core';

@Component({
  selector: 'p-jsgrid',
  templateUrl: './js-grid.component.html',
  styleUrls: ['./js-grid.component.css']
})
export class JsGridComponent implements OnInit, AfterViewInit {

  public $jsGrid;

  private userOnDataLoaded;
  private isRenderHeader = false;
  private injectorEmit = new EventEmitter();
  private sortMappings = [];
  private padding;

  private oldFieldTitle = []; // for translate service
  private currentPagingOption: PageModel;
  public pageSize = 15;

  public _options: any = {
    width: '100%',
    height: 'auto',
    sorting: true,
    paging: true,
    selecting: false,
    autoload: true,
    pageLoading: true,
    pageIndex: 1,
    pagerFormat: 'Sider: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}',
    pagePrevText: 'Forrige',
    pageNextText: 'Neste',
    pageFirstText: 'Først',
    pageLastText: 'Siste',
    pageNavigatorNextText: '...',
    pageNavigatorPrevText: '...',
    invalidMessage: 'Ugyldige data lagt inn!',
    noDataContent: 'Ikke funnet',
    deleteConfirm: 'Er du sikker?',

    loadIndication: true,
    loadIndicationDelay: 500,
    loadMessage: 'Vennligst vent...',
    downloadExcelUrl: {},
    pageSize: this.pageSize,
    controller: {
      loadData: (filter) => {
        filter.pageSize = this.pageSize;
        this.pageChanged.emit(filter);

        this.currentPagingOption = filter;
        // Sort mapping for which fields that has sortMapping property
        filter = (this.sortMappingFilter(filter));

        // Clearpaging property if paging=false
        filter = (this.clearPaging(filter));

        let promise = this._api(filter);

        // Return new promise if has bottomItem function
        if (this._options.bottomItem) {
          promise.then(source => {

            if (source.data.length === 0) {
              return promise;
            }

            source.data.push(this._options.bottomItem(source.data, this.$jsGrid));
            return new Promise(resolve => {
              resolve(source);
            });
          });
        }

        return promise;
      },
      onError: (error) => {
        console.log('Kan ikke laste inn data for grid', error);
      }
    },
    onDataLoaded: (args) => {
      // Bootstrap tooltip
      this.appendPageSizeSelection(args);

      args.grid.pageSize = this.pageSize;
      $('[data-toggle="tooltip"]').tooltip();

      // Still apply onDataLoaded function for which pages are using.
      this.injectorEmit.emit(args);

      // [DD]: Multi header
      if (this._options.multipleHeader && !this.isRenderHeader) {
        if (this._options.columnpadding) {
          this.padding = Number.parseInt(this._options.columnpadding);
        }
        this.rederMultiHeader(args);
        this.isRenderHeader = true;
      }


      // [DD]: FakeGrid for print
      if (this._options.fakePrintGrid) {
        this.createFakeGrid();
      }
    },
    onRefreshed: function () {

    }
  };

  // append page-size selection box
  appendPageSizeSelection(args) {

    args.grid._pagerContainer.find('.jsgrid-pager')
      .prepend(`<span>Limit</span>
                <select id="pageSizeCheckbox"  class="form-control" style="width: auto; display: -webkit-inline-box;">
                <option value='15' id='v-15'>15</option>
                <option value='50' id='v-50'>50</option>
                <option value='100' id='v-100'>100</option>
            </select> -- `);
    if (args.grid._pagerContainer.find('#pageSizeCheckbox').length > 0) {
      args.grid._pagerContainer.find('#pageSizeCheckbox')[0].onchange = () => {
        this.pageSize = parseInt($('#pageSizeCheckbox').val());
        this.reloadGrid();
      }

      const options = args.grid._pagerContainer.find('#pageSizeCheckbox')[0];
      switch (this.pageSize) {
        case 15:
          options[0].selected = true;
          break;
        case 50:
          options[1].selected = true;
          break;
        case 100:
          options[2].selected = true;
          break;
      }

    }
  }

  @Input()
  set options(config) {

    // Clone onDataLoaded function
    this.userOnDataLoaded = config.onDataLoaded;
    if (config.onDataLoaded) {
      this.injectorEmit.subscribe(args => {
        this.userOnDataLoaded(args);
      });
    }
    delete config.onDataLoaded;

    this._options = _.assign({}, this._options, config);
    this.pageChanged.emit(config);
    if (!config.filteringDefault) {
      this.hideAllFiltering(this._options);
    }
    this._options.fields.forEach(item => {
      if (item.sortMapping) {
        this.sortMappings.push({ prop: item.name, sortProp: item.sortMapping });
      }
    });
  }

  @Output() pageChanged = new EventEmitter();

  // Two-way data binding [api]
  public _api;
  @Output() apiChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  set api(val) {
    this._api = val || ((paging) => { return { data: {}, itemsCount: 0 }; });
    this.apiChange.emit(val);

    if (this.gridIsEmpty()) {
      this.$jsGrid.jsGrid(this._options);
    } else {
      this.reloadGrid();
    }
  }
  get api() {
    return this._api;
  }

  public updatePageSize() {
    this.reloadGrid();
  }


  constructor(
    private elemRef: ElementRef, private _httpService: HttpService,
    private _translateService: TranslateService
  ) { }

  ngAfterViewInit(): void {
  }


  exportExcel(e) {
    // download only one page
    if (this._options.downloadExcelUrl) {
      this.currentPagingOption.pageSize = -1;
      this._httpService.getQueries(this._options.downloadExcelUrl.Url, _.assign({},
        this._options.downloadExcelUrl.params, this.currentPagingOption))
        .map(res => res.json())
        .subscribe(res => {
          const data = res.data;
          let tempTable;
          tempTable = $(this.elemRef.nativeElement).find('#fake-jsgrid');
          tempTable.jsGrid(this._options);

          let $fakeTitleRow = this.$jsGrid.find('table:first').find('tr:first').clone();

          // set width columns
          $fakeTitleRow[0].childNodes.forEach(element => {
            element.style.width = '250px';
          });

          let $fakeBodyTable = tempTable.jsGrid('option', 'data', data).find('table:last').clone();
          let $conditionRow = $fakeTitleRow.clone();


          $fakeBodyTable.prepend($fakeTitleRow);
          this.createHeaderExportExcel($conditionRow, $fakeBodyTable);

          Common.createExcelFile(window, $fakeBodyTable[0], 'Sheet1', this._translateService.translate(this._options.excel.fileName));
        });
    } else {
      let $fakeTitleRow = this.$jsGrid.find('table:first').find('tr:first').clone();
      let $fakeBodyTable = this.$jsGrid.find('table:last').clone();

      $fakeBodyTable.prepend($fakeTitleRow);
      Common.createExcelFile(window, $fakeBodyTable[0], 'Sheet1', this._options.excel.fileName);
    }
  }

  private createHeaderExportExcel(headerFile, tableContent) {

    // create first row: table name
    let titleRow = this.$jsGrid.find('table:first').find('tr:first').find('th:first').clone();
    titleRow["0"].colSpan = headerFile["0"].childNodes.length;
    titleRow["0"].textContent = this._translateService.translate(this._options.excel.fileName);
    titleRow["0"].style.fontSize = '15pt';
    titleRow["0"].style.border = '0pt';
    let templateConditionRow = this.$jsGrid.find('table:first').find('tr:first').clone();
    let templateCell = this.$jsGrid.find('table:first').find('tr:first').find('th:first').clone();
    // remove unuse cell

    while (templateConditionRow[0].childNodes.length > 0) {
      templateConditionRow[0].removeChild(templateConditionRow[0].childNodes[0]);
    }

    // add empty row
    tableContent.prepend(templateConditionRow);
    // add row for search condition
    // tslint:disable-next-line:forin
    for (const key in this._options.downloadExcelUrl.params) {
      if (this._options.downloadExcelUrl.params[key]) {
        const condition = templateConditionRow.clone();
        condition["0"].style.border = '0pt';

        const nameCondition = templateCell.clone();
        nameCondition[0].textContent = this._options.fields.filter(t => t.name === key)[0].title;
        nameCondition[0].style.border = '0pt';
        condition[0].appendChild(nameCondition[0]);

        const valueCondition = templateCell.clone();
        valueCondition[0].textContent = this._options.downloadExcelUrl.params[key];
        valueCondition[0].style.border = '0pt';
        condition[0].appendChild(valueCondition[0]);
        tableContent.prepend(condition);
      }
    }

    // add empty row
    tableContent.prepend(templateConditionRow.clone());
    tableContent.prepend(titleRow);
  }

  printThisOne() {
    $(this.elemRef.nativeElement).print();
  }

  changeTitle(title) {
    this._options.fakeGridTitle = title;
  }

  private reloadGrid() {
    this.$jsGrid = $(this.elemRef.nativeElement).find('.this-is-grid');
    this._options.pageSize = this.pageSize;
    this.$jsGrid.jsGrid(this._options);
    setTimeout(() => { this.backToFirst(); }, 1);
  }

  // [DD] Private functions
  // [DD] Just cheat for work-around - will repair later
  private backToFirst() {
    $('.jsgrid-pager-page a').each((i, e) => {
      let $elem = $(e);
      if ($elem.text() === '1') {
        $elem.trigger('click');
      }
    });
  }

  private sortMappingFilter(filter) {
    let mappingField = _.find(this.sortMappings, (item) => item.prop === filter.sortField);
    if (mappingField) {
      filter.sortField = mappingField.sortProp;
    }
    return filter;
  }

  private clearPaging(filter) {
    if (this._options.paging === false) {
      delete filter.pageSize;
      delete filter.pageIndex;
      return filter;
    }
    return filter;
  }

  private hideAllFiltering(config) {
    config.fields.forEach((item) => {
      if (!item.filtering) {
        item.filtering = false;
      }
    });
  }

  private rederMultiHeader(args) {
    let autoReserve = 0;
    this._options.multipleHeader.forEach((item) => {
      let totalWidth = 0;
      let colSpans = [];
      item.names.forEach(nameItem => {
        args.grid.fields.forEach((f, i) => {
          if (nameItem === f['name']) {
            colSpans.push(i);
            if (this.padding) {
              totalWidth += f['width'] + this.padding;
            } else {
              totalWidth += f['width'];
            }
          }
        });
      });

      colSpans.forEach((c, i) => {
        if (i > 0) {
          args.grid._header.find(`th:nth-child(${c + 1 - autoReserve})`).remove();
          autoReserve++;
        } else {
          args.grid._header.find(`th:nth-child(${c + 1 - autoReserve})`)
            .text(item.title)
            .attr('colspan', item.names.length)
            .width(Math.round(totalWidth - 16.222));
        }
      });
    });
  }

  private gridIsEmpty() {
    let $elem = $(this.elemRef.nativeElement).find('.this-is-grid');
    let result = $elem.html() === '';
    if (result) {
      this.$jsGrid = $elem;
    }
    return result;
  }

  private createFakeGrid() {
    $(this.elemRef.nativeElement).find('.fake-grid').empty();
    let $fakeTitleRow = this.$jsGrid.find('table:first').find('tr:first').clone();
    let $fakeBodyTable = this.$jsGrid.find('table:last').clone();
    $fakeBodyTable.prepend($fakeTitleRow);
    $fakeBodyTable.addClass('table').addClass('table-bordered').removeClass('jsgrid-table');
    $fakeBodyTable.find('tr,td,th').removeAttr('class');
    $(this.elemRef.nativeElement).find('.fake-grid').append($fakeBodyTable);
    this.$jsGrid.addClass('hidden-print');
  }

  reloadFakeGrid() {
    this.createFakeGrid();
  }

  ngOnInit() {
    this.subscribeToLangChanged();
  }

  /** I18N for table header */
  subscribeToLangChanged() {

    // save orinal title to translate
    this._options.fields.forEach(element => {
      element.orinalTitle = element.title;
    });

    return this._translateService.onLangChanged.subscribe(x => {

      this._options.fields.forEach(element => {
        element.title = this._translateService.translate(element.orinalTitle);
      });
      this.$jsGrid.jsGrid(this._options);
    });
  }
}
