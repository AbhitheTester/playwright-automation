const Excel=require('exceljs')
async function  data() {
   const workbook= await new Excel.Workbook();
   await workbook.xlsx.readFile("C:/Users/Lenovo/Downloads/abhishek.xlsx")
   //"C:\Users\Lenovo\Downloads\abhishek.xlsx"
  const sheet= await workbook.getWorksheet('Sheet1')
  const row=await sheet.eachRow((row,rowNumber)=>{
    row.eachCell((cell,colNumber)=>{
        console.log(cell.value);
    })
  })
   
    
}

data();