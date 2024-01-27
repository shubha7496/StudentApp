import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper ,Button} from '@mui/material';

export default function Student() {
    const paperStyle={padding:'50px',width:600,margin:"20px auto"}
    const [name,setName]=React.useState('')
    const [address,setAddress]=React.useState('')
    const [students,setstudents]=React.useState([])
   // const classes=useStyles();
   const handleclick= (e) => {
    e.preventDefault();
    const student={name,address}
    console.log(student)
    fetch("http://localhost:8081/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("new student added")
    })
   }
   React.useEffect(() =>{
    fetch("http://localhost:8081/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setstudents(result);
    }
   )
},[])
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
   <Button variant="contained" color="secondary" onClick={handleclick}> Submit</Button>

    </Box>
    </Paper>
        <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students.map(student =>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
            Id : {student.id}<br/>
            Name : {student.name}<br/>
            Address : {student.address}
      </Paper>
      ))
      }
      </Paper> 
     </Container>
  );
}
