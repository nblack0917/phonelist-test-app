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
import { RiCheckFill } from "react-icons/ri";
import SMSForm from './SMSForm';
import './App.css';

  
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID || "";




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
    photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    workPhone:'813-555-1719',
    email: 'nick@flintavenue.com',
    birthday: new Date(1979, 11, 2),
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
    photo: 'https://pbs.twimg.com/profile_images/660251274206515200/BQaWkc10_400x400.jpg',
    workPhone:'412-555-1212',
    email: 'mike@dm.com',
    birthday: new Date(1975, 10, 5),
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
    photo: 'https://pbs.twimg.com/profile_images/1324738945184419843/pYyZ72lj.jpg',
    workPhone:'512-555-3874',
    email: 'beepbeep@zoom.com',
    birthday: new Date(1953, 6, 4),
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
  const [showGroup, setShowGroup] = useState(false);
  const [groupMessage, setGroupMessage] = useState('');
  const [currentContact, setCurrentContact] = useState(false);
  const [currentMultiContact, setCurrentMultiContact] = useState([]);
  const [mulitSelect, setMultiSelect] = useState({
    1: false,
    2: false,
    3: false,
  });

  const handleClose = () => setShow(false);
  const handleGroupClose = () => setShowGroup(false);
  const handleShow = () => setShow(true);

  const handleSendMessage = (contact) => {
    setCurrentContact(contact)
    setShow(true)
  }

  const handleCheckContact = (contact) => {
    setMultiSelect(prev => ({
      ...prev,
      [contact.id]: !mulitSelect[contact.id]
    }))
    let selected = [...currentMultiContact]
    let contactIdx = selected.map((e) => { return e.id; }).indexOf(contact.id);
    console.log(contactIdx, contact)
    if(contactIdx === -1) {
    setCurrentMultiContact([...selected, contact])
    // setShow(true)
    } else {
      selected.splice(contactIdx, 1)
      setCurrentMultiContact([...selected])
    }
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

  const SendGroupMessageModal = () => {
    const [message, setMessage] = useState("")

    const handleSendGroup = () => {
      let groupChat = {
        binding: [],
        numbers: [],
        message: message
      }
      currentMultiContact.forEach(contact => {
        groupChat.numbers.push(contact.phone.split("-").join(""))
        // groupChat.binding.push({binding_type: 'sms', address: `+1${contact.phone.split("-").join("")}`})
      })
  
      
      fetch('/api/bulk_messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupChat)
      }).then(
        console.log("binding", groupChat.binding)

      )
    }

    const handleSend = () =>{
      handleSendGroup()
      handleGroupClose()
    }
    
    return (
      <Modal show={showGroup} onHide={handleGroupClose}>
      <Modal.Header>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <textarea
            name="groupMessage"
            id="groupMessage"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSend}>
          Send
        </Button>
        <Button variant="secondary" onClick={handleGroupClose}>
          Cancel
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
        vCard.photo.attachFromUrl(activeContact[0].photo, 
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

    const handleDownloadGroup = (id) => {

      var vCardsJS = require('vcards-js');

      let newCard = []
      let blob;
     
      currentMultiContact.forEach(contact => {
        //create a new vCard
        var vCard = vCardsJS();
         
        //set properties
        vCard.firstName = contact.first_name;
        vCard.middleName = contact.middle_name;
        vCard.lastName = contact.last_name;
        vCard.organization = contact.organization;
        vCard.photo.attachFromUrl(contact.photo)
        vCard.workPhone = contact.workPhone;
        vCard.birthday = contact.birthday;
        vCard.title = contact.title;
        vCard.url = contact.url;
        vCard.note = contact.note;
         

        newCard.push(vCard)
        //save to file
        // vCard.saveToFile('./eric-nesser.vcf');
      })
          blob = new Blob([ newCard.forEach(card=>card.getFormattedString()) ], {type: "text/vcard;charset=utf-8"});
          // console.log(vCard.getFormattedString());
      const FileSaver = require('file-saver');
      FileSaver.saveAs(blob, "phoneListContact.vcf");
         
        //get as formatted string
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
                  <TableCell align="center">Download</TableCell>
                  <TableCell align="center">Message</TableCell>
                  <TableCell align="left">Group Select</TableCell>
                
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
                    <TableCell align="right">{mulitSelect[row.id] ? <div className="checkbox clickable" onClick={() => handleCheckContact(row)}><h4 className="text-danger"><RiCheckFill  /></h4></div> : <div className="checkbox clickable" onClick={() => handleCheckContact(row)}></div>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {currentMultiContact.length > 0 &&
          <Row className="mt-4 w-100 text-center">
             <h3>Selected Contacts</h3>
             {currentMultiContact.map((contact) =>(
              <h5>{contact.first} {contact.last}</h5>
             ))}
             <Button onClick={() => setShowGroup(true)}>send group message</Button>
             <Button className="mt-2" onClick={handleDownloadGroup}>Download group contacts</Button>
          </Row>
          }

          <SendMessageModal 
            show={show}
            onHide={() => setShow(false)}
          />
          <SendGroupMessageModal 
            show={showGroup}
            onHide={() => setShowGroup(false)}
          />
        </Container>
    );
};

export default App;
