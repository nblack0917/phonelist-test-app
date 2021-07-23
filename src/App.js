import React, { Component, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RiMailDownloadFill } from "react-icons/ri";
import { RiMessage2Fill } from "react-icons/ri";
import SMSForm from './SMSForm';
import './App.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const contactData = [
  {
    id: 1,
    first_name: "Nick",
    middle_name: 'A',
    last_name: "Black",
    organization: 'Flint Avenue',
    photo: '',
    workPhone:'813-391-1719',
    email: 'nick@flintavenue.com',
    birthday: new Date(1985, 0, 1),
    title: 'Software Developer',
    url: '',
    note: 'Lets hope this works',
  },
  {
    id: 2,
    first_name: "Micheal",
    middle_name: '',
    last_name: "Scott",
    organization: 'Dunder Mifflin',
    photo: '',
    workPhone:'412-555-1212',
    email: 'mike@dm.com',
    birthday: new Date(1985, 0, 1),
    title: 'Paper Sales',
    url: '',
    note: 'Worlds Best Boss',
  },
  {
    id: 3,
    first_name: "Wiley",
    middle_name: 'E',
    last_name: "Coyote",
    organization: 'ACME Corporation',
    photo: '',
    workPhone:'876-555-1212',
    email: 'beepbeep@zoom.com',
    birthday: new Date(1985, 0, 1),
    title: 'Engineer',
    url: '',
    note: 'Painting tunnels is my special',
  },
]

function createData(id, first, last, email, phone) {
  return { id, first, last, email, phone };
}

// const rows = [
//   createData('Joe', "Shmoe", "email@email.com", "(512)555-5555"),
//   createData('Joe', "Shmoe", "email@email.com", "(512)555-5555"),
//   createData('Joe', "Shmoe", "email@email.com", "(512)555-5555"),
//   createData('Joe', "Shmoe", "email@email.com", "(512)555-5555"),
//   createData('Joe', "Shmoe", "email@email.com", "(512)555-5555"),
// ];


const App = () => {
  const [show, setShow] = useState(false);
  const [currentContact, setCurrentContact] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSendMessage = (contact) => {
    setCurrentContact(contact)
    setShow(true)
  }

  const SendMessageModal = () => {
    
    return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SMSForm contact={currentContact} handleClose={() => handleClose()} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }

  const classes = useStyles();

    const CreateVCard = (id) => {
      let activeContact = contactData.filter(contact => contact.id === id)
      console.log(activeContact)

    var vCardsJS = require('vcards-js');
     
        //create a new vCard
        var vCard = vCardsJS();
         
        //set properties
        vCard.firstName = activeContact[0].first_name;
        vCard.middleName = activeContact[0].middle_name;
        vCard.lastName = activeContact[0].last_name;
        vCard.organization = activeContact[0].organization;
        vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 
    'JPEG');
        vCard.workPhone = activeContact[0].workPhone;
        vCard.birthday = activeContact[0].birthday;
        vCard.title = activeContact[0].title;
        vCard.url = activeContact[0].url;
        vCard.note = activeContact[0].note;
         
        //save to file
        // vCard.saveToFile('./eric-nesser.vcf');
        const FileSaver = require('file-saver');
        const blob = new Blob([ vCard.getFormattedString() ], {type: "text/vcard;charset=utf-8"});
        FileSaver.saveAs(blob, "contact.vcf");
         
        //get as formatted string
        console.log(vCard.getFormattedString());
    };

    // useEffect(() => {

    // }, [])

    const rows = [];

    contactData.forEach(contact => {
      rows.push(createData(contact.id, contact.first_name, contact.last_name, contact.email, contact.workPhone))
    })

    return (
        // <Container className="w-100 bg-success"> 
        //   <Row className="w-25">         
        //       <Button onClick={() => CreateVCard()}>
        //             Save
        //       </Button>
        //   </Row>
        // </Container>
        <Container className="w-100 py-5">
          <Navbar bg="danger" variant="dark">
            <Container>
            <Navbar.Brand href="#home">MANAGER DASHBOARD</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            </Container>
          </Navbar>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tom Smith</Card.Title>
              <Card.Text>
                Select a contact to download.
              </Card.Text>
            </Card.Body>
          </Card>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.first}</TableCell>
                    <TableCell align="right">{row.last}</TableCell>
                    <TableCell align="right"><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                    <TableCell align="right"><a href={`tel:+1${row.phone.split("-").join("")}`}>{row.phone}</a></TableCell>
                    <TableCell align="center"><h2 className="text-danger clickable"><RiMailDownloadFill onClick={() => {CreateVCard(row.id)}} /></h2></TableCell>
                    <TableCell align="center"><h2 className="text-danger clickable"><RiMessage2Fill onClick={() => handleSendMessage(row)} /></h2></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <SendMessageModal 
            show={show}
            onHide={() => setShow(false)}
          />
        </Container>
    );
};

export default App;
