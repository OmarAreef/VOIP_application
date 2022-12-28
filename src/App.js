import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Web } from "sip.js";
import { Container, Col, Row, Image, Button } from 'react-bootstrap';

function App() {
  const server = "wss://edge.sip.onsip.com";
  const aor = "sip:" + sessionStorage.getItem('email')
  const whoToCall = (sessionStorage.getItem('email') === 'omar@dmetvoip.onsip.com') ? 'omar3@dmetvoip.onsip.com' : 'omar@dmetvoip.onsip.com'
  const [contact, setContact] = useState("sip:" + whoToCall)
  const local = useRef(null);
  const remote = useRef(null);
  const [incoming, setIncoming] = useState(null)
  const [answered, setanswered] = useState(false)
  const [registered, setRegistered] = useState(false)
  const audio = new Audio("telephone-ring-04.mp3")
  const [UA, setUA] = useState(null);
  const delegate = {

    onCallReceived: async () => {
      // alert("Call received")
      // audio.play()
      setIncoming("Incoming Call")
      console.log(UA)
      // await UA.answer()

    },
    onCallHangup: async () => {
      setanswered(false)
      setIncoming(null)
      audio.pause()
    },
    onCallAnswered: async () => {
      setanswered(true)
      setIncoming(null)
      console.log("=============================== HEREEE ==========")
      audio.pause()
    }
  };
  const options = {
    aor,
    delegate: delegate,

    media: {
      constraints: { audio: true, video: true },
      local: {
        video: local.current
      },
      remote: {
        video: remote.current
      }

    }

  };


  var Singleton = (function (serverString, optionObject) {
    var instance;

    function createInstance() {
      var UAsingle = new Web.SimpleUser(serverString, optionObject)
      return UAsingle;
    }

    return {
      getInstance: function () {
        console.log(instance)
        if (instance === undefined) {
          console.log("NEW INSTANCE")
          console.log(instance)
          instance = createInstance();
        }
        return instance;
      }
    };
  });


  const call = () => {
    UA.call(contact)

  }

  const answer = async () => {

    await UA.answer()
    console.log(answer)
    setanswered(true)
    console.log("NOT CONNECTED")
  }


  const decline = async () => {

    await UA.decline().then((e) => {
      setanswered(false)
    })

  }
  const hangup = async () => {

    await UA.hangup().then((e) => {
      setanswered(false)
    })

  }
  const connectToServer = async () => {
    // UA = new Web.SimpleUser(server, options)
    UA.options.media.local.video = local.current
    UA.options.media.remote.video = remote.current
    console.log(UA)
    await UA.connect()
    await UA.register()
    setRegistered(true)

  }


  const DeRegister = async () => {
    await UA.unregister()
    await UA.disconnect().then(() => {
      setRegistered(false)
      console.log("DEREGISTER")
    })
  }
  useEffect(() => {

    // UA = new Web.SimpleUser(server, options)

    // setLocal()
    // setRemote(document.querySelector('#remote'))

    setUA(Singleton(server, options).getInstance());
    console.log("NEW USER AGENT")
  }, [])
  // useEffect(() => {
  //   console.log("NEW LOCAL VIDEO")
  //   setUA(Singleton(server, options).getInstance())
  //   if (UA) {
  //     UA.options.media.local.video = local.current
  //     console.log(UA)
  //   }
  // }, [local, remote])
  // connectToServer()
  return (
    <div className='justify-content-center align-items-start text-center full'>
      <Row className='bg-light mb-4 ms-auto me-auto'>

        <Col xs={2}>
          <Image fluid={true} className='ms-auto me-auto logo' src="profile.png" />
        </Col>
        <Col xs={6} className='d-flex text-start align-items-center p-0'>
          <small>{sessionStorage.getItem('email')}</small>
        </Col>
        <Col xs={2} className='d-flex text-start align-items-center p-0'>
          {!registered && <Button variant='success' onClick={() => connectToServer()}> register</Button>}
          {registered && <Button variant='danger' onClick={() => DeRegister()}> Disconnect</Button>}
        </Col>
      </Row >
      {
        (!incoming || !answered) && <>
          <Row className='bg-light mb-4 ms-auto me-auto'>
            <Col><small>{contact}</small></Col>
            <Col><Button variant='primary' onClick={() => call()}> Call</Button></Col>

          </Row>
        </>
      }

      {
        incoming &&
        <Row className='bg-light mb-4 ms-auto me-auto'>
          <Col> <small> Incoming Call</small></Col>
          <Col xs={2}><Button variant='primary' onClick={() => answer()}> Answer </Button></Col>
          <Col xs={2}><Button variant='danger' onClick={() => decline()}> Decline</Button></Col>
        </Row>
      }
      <div className={answered ? " " : 'd-none'}>

        <Row >

          <video ref={remote} className='ms-auto me-auto' id="remoteVideo"></video>

        </Row>
        <Row  >
          <video ref={local} className='ms-auto me-auto' id="localVideo" muted="muted"></video>
        </Row>
        <Row >
          <Button variant='danger' onClick={() => hangup()}> Hang up</Button>
        </Row>

      </div>



    </div >
  );
}

export default App;
