![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/siemienik/xlsx-renderer)![GitHub top language](https://img.shields.io/github/languages/top/siemienik/xlsx-renderer)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siemienik/xlsx-renderer)

# xlsx-renderer
Render xlsx from a template (it uses another xlsx file with special commands like "#! FOR_EACH item items")

## Install:

package.json:
```
    "xls-renderer": "git+ssh://git@github.com/siemienik/xlsx-renderer.git#release/v1",
```

`npm install`

## In Cell Commands:

1. `## varToDisplayInThisCell`
2. `#! FINISH` - finish processing current worksheet
2. `#! FINISH booleanVar` - if true it finishes processing current template worksheet, if false it add again this worksheet to output
3. `#! END_ROW`
4. `#! DELETE varName`
5. `#! HYPERLINK labelVar urlVar`
6. `#! WS_NAME nameVar` set worksheet name
7. `#! FOR_EACH item collection` (to write item property `## item.property`),
8. `#! CONTINUE item` item is set to the next collection item.
9. `#! END_LOOP item`
10. `#! AVERAGE item` write average formula of all items from previous for-each, it has to be placed after the for-each was finished.
11. `#! SUM item` similar to average
12. `#! DUMP_COLS arrayVar` write to next columns all array items (1 item = 1 column)


## Sample code:

```javascript
import Renderer from './xls-renderer/Renderer'
import {Workbook} from 'exceljs'

//*
import DebugCellTemplatePool from "./xls-renderer-debug/CellTemplateDebugPool";
const renderer = new Renderer(new DebugCellTemplatePool());
/*/
import CellTemplatePool from "./xls-renderer/CellTemplatePool";
const renderer = new Renderer(new CellTemplatePool()); 
//*/


const viewModel = new MyAwesomeReportVm(); //or something else

(async () => {
    const result = await renderer.render(async () => {
            const template = new Workbook();
            return await template.xlsx.readFile('./my-awesome-raport-template.xlsx');
        }, viewModel);     
    
    await result.xlsx.writeFile('./my-awesome-raport.xlsx');
})();

```