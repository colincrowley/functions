/******************************************************************************
**       __   __   __   __       __      __        __  __ ___  __            **
**      | __ |  | |  | | __ |   |__     |__' |__| |__ |__  |  |__'           **
**      |__| |__| |__| |__| |__ |__     .__| |  | |__ |__  |  .__|           ** 
**                                                                           **
******************************************************************************/

/******************************************************************************
**  What:   Goto Table for sheets in Google workbook
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/


/*
** Creats menu 'Tasks' where the script Go to sheets can be implemented
**
*/
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

function onOpen(event) {  
    var menuEntries = [({name: "Go to sheet...", 
        functionName: "showGoToSheet"})];   
    spreadsheet.addMenu("Tasks", menuEntries); 
}

/*
** Layout for table of sheet names
*/
function showGoToSheet() {
    var app            = UiApp.createApplication().setTitle("Go to sheet...").setHeight(400).setWidth(450);
    var sPanel         = app.createScrollPanel().setAlwaysShowScrollBars(true).setSize(440, 400);
    var vPanel         = app.createVerticalPanel().setSize(400, 400);
    var fTable         = app.createFlexTable().setCellPadding(5).setSize(400, 400).setCellSpacing(0).setBorderWidth(1); 
    var allsheets      = spreadsheet.getSheets();   
    var goToSheetClick = app.createServerHandler('handleGoToSheetClick');     
    for (var i=0, iLen=allsheets.length; i<iLen; i++) {
        var sheet_name = allsheets[i].getName();
        fTable.setWidget(i, 0, app.createButton(sheet_name).setId(sheet_name).setWidth(200).addClickHandler(goToSheetClick)); 
    }
    /*
    ** Adding sheet names to table
    */
    app.add(sPanel.add(vPanel.add(fTable)));
    spreadsheet.show(app);
}

/*
** Clicking on sheet table goes to sheet
*/
function handleGoToSheetClick(e) {
    var app = UiApp.getActiveApplication();  
    spreadsheet.getSheetByName(e.parameter.source).activate();
    app.close();   
    return app; 
}
/*****************************************************************************/


/******************************************************************************
**  What:   Creates tool bar option to run scripts
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/



/******************************************************************************
 *  Creats menu 'Tasks' where the script Go to sheets can be implemented
 */
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var ui          = SpreadsheetApp.getUi();
function onOpen(event) {  

    ui.createMenu('Tasks')
        .addItem('Run autoFill', 'autoFill')
        .addItem('Send email', 'emailSpreadsheetAsPDF')
        .addToUi();
}

/*****************************************************************************/


/******************************************************************************
**  What:   Creates sheet of template based on row data
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/

function CreateSheet() {
    var spreadsheet       = SpreadsheetApp.getActiveSpreadsheet();
    var activeSpreadsheet = spreadsheet.getSheetByName("Main");
    var data              = activeSpreadsheet.getRange("A4:A").getValues();
    
    /*
    ** Itterate through "Main" sheet to get project names
    ** and create a sheet with the same name.
    */
    var len = data.length
    for (var row = 0; row < len; row++) {      
        var projectNames = data[row]; 
        /*
        ** Check if a sheet has already been dedicated to a Project.
        ** Check if the project name is valid, ie. not the title.
        ** If it hasn't then create a dedicated sheet.
        */
        if ((spreadsheet.getSheetByName(projectNames) == null) && (projectNames != '')){ 
        var yourNewSheet = spreadsheet.insertSheet();
        yourNewSheet.setName(projectNames);
        var sheet = spreadsheet.getSheetByName(projectNames);
        
        /*
        ** Layout of 'Template' and setting fonts.
        */
        sheet.setColumnWidth(1, 200);
        sheet.setColumnWidth(2, 200);
        sheet.setColumnWidth(3, 500);
        var cell = sheet.getRange("A1").setFontWeight("bold");
        cell.setValue("Software Releases");
        var cell = sheet.getRange("B1").setFontWeight("bold");
        cell.setValue("Description");
        var cell = sheet.getRange("C1").setFontWeight("bold");
        cell.setValue("Link");
        var cell = sheet.getRange("A5").setFontWeight("bold");
        cell.setValue("Test Softwares");
        var cell = sheet.getRange("A10").setFontWeight("bold");
        cell.setValue("Documentation Links");
        var cell = sheet.getRange("A15").setFontWeight("bold");
        cell.setValue("Flashing / Programming");
        } 
    }
}


/*****************************************************************************/

/******************************************************************************
**  What:   Creates menu tab and adds functions to it
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/
/*
** Creats menu 'Tasks' where the script Go to sheets can be implemented
**
*/
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var ui          = SpreadsheetApp.getUi();
function onOpen(event) {  

    ui.createMenu('Tasks')
        .addItem('Some Title..', 'function')
        .addItem('Some Title..', 'function')
        .addToUi();
}


/*****************************************************************************/


/******************************************************************************
**  What:   Aditional built in functions
**
**  Name:   Colin Crowley
**
**  Date:   12-05-2016
**
******************************************************************************/

import gspread

gc = gspread.login('youremail@gmail.com','yourpassword')

"""Open Google Spreadsheet """
sh = gc.open_by_url(''https://docs.google.com/spreadsheet/cvhpasdvhu)   #Open by URL

""" Select Worksheet """
worksheet = sh.get_worksheet(0) # Select worksheet by index

worksheet = sh.worksheet("January") # By title

worksheet = sh.sheet1 # By sheet order

worksheet_list = sh.worksheets() # Get list of worksheets

""" Get Cell Values """
val = worksheet.acell('B1').value # With label

val = worksheet.cell(1, 2).value # With coords

""" Get all values from row or column """
values_list = worksheet.row_values(1)

values_list = worksheet.col_values(1)

""" Get all values from worksheet as list of lists """
list_of_lists = worksheet.get_all_values()

""" Find cell with given value """
cell = worksheet.find("Mail") # Find a cell with exact string

mail_re = re.compile(r'(Google|Yahoo) Mail') # Use regex to search
cell = worksheet.find(mail_re)

""" Find all matched cells """
cell_list = worksheet.findall("Mail")

mail_re = re.compile(r'(Google|Yahoo) Mail')
cell_list = worksheet.findall(mail_re)


/*****************************************************************************/


/******************************************************************************
**  What:   Converts Sheets to PDF format and sends via email
**
**  Name:   Colin Crowley
**
**  Date:   24-08-2016
**
******************************************************************************/

/* Send Spreadsheet in an email as PDF, automatically */
function emailSpreadsheetAsPDF() {
  
  // Send the PDF of the spreadsheet to this email address
  var email = "colin.crowley@valeo.com,  ahmed.fathy@valeo.com,trevor.dempsey@valeo.com, dave.clarke@valeo.com";
  
  // Get the currently active spreadsheet URL (link)
  // Or use SpreadsheetApp.openByUrl("<<SPREADSHEET URL>>");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Subject of email message
  var subject = "vModel";// + ss.getName(); //Spreadsheet name 
  
  // Email Body (- HTML FORMAT -)
  var body = "Hi all,<br><br>Here are the PDF copies of the vModel and relevant data.<br>https://docs.google.com/a/valeo.com/spreadsheets/d/1Xb7o_-deC7jiv0CC6rfZKJ3sSgtoIhn6RZpq8AJlAZY/edit?usp=sharing<br><br><br>"
  
  // Base URL
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", ss.getId());
  
  var url_ext = 'exportFormat=pdf&format=pdf'       // export as pdf / csv / xls / xlsx
  + '&size=letter'                                  // paper size legal / letter / A4
  + '&portrait=false'                               // orientation, false for landscape
  + '&fitw=true&source=labnol'                      // fit to page width, false for actual size
  + '&sheetnames=false&printtitle=false'            // hide optional headers and footers
  + '&pagenumbers=false&gridlines=false'            // hide page numbers and gridlines
  + '&fzr=false'                                    // do not repeat row headers (frozen rows) on each page
  + '&gid=';                                        // the sheet's Id
  
  var token = ScriptApp.getOAuthToken();
  var sheets = ss.getSheets(); 
  
  //make an empty array to hold your fetched blobs  
  var blobs = [];
  
  for (var i=0; i<sheets.length; i++) {
    
    // Convert individual worksheets to PDF
    var response = UrlFetchApp.fetch(url + url_ext + sheets[i].getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
    
    //convert the response to a blob and store in our array
    blobs[i] = response.getBlob().setName(sheets[i].getName() + '.pdf');
    
  }
  
  //create new blob that is a zip file containing our blob array
 // var zipBlob = Utilities.zip(blobs).setName(ss.getName() + '.zip'); 
  
  //optional: save the file to the root folder of Google Drive
  // DriveApp.createFile(zipBlob);
  
  // Define the scope
  Logger.log("Storage Space used: " + DriveApp.getStorageUsed());
  
  // Send the email with the PDF attachment
  if (MailApp.getRemainingDailyQuota() > 0) 
    GmailApp.sendEmail(email, subject, body, {
      htmlBody: body,
      //attachments:[zipBlob] //for a single zip file
      attachments:[blobs[0],blobs[1]] //for independant files
    });  
}




/******************************************************************************
**  What:   
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/



/******************************************************************************
**  What:   
**
**  Name:   Colin Crowley
**
**  Date:   10-05-2016
**
******************************************************************************/




