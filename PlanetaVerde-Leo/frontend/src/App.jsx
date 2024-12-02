import { Container,Navbar,Nav,Col,Image } from "react-bootstrap"
import { Route,Routes,Link } from "react-router-dom"

import Doadores from "./Components/Doadores"
import Lista from "./Components/Lista"

function App() {

  return (
    <>
      <Container>
          <Col className="d-flex justify-content-center" >
            <Image src="../public/img/logo1.jpg" roundedCircle style={{ width: '250px', height: '250px' }}/>
          </Col>
      </Container>

      <Navbar bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/">
              <h1 >Planeta Verde</h1>
          </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Doador
              </Nav.Link>
              <Nav.Link as={Link} to="/listar">
                Lista
              </Nav.Link>
            </Nav>
        </Container>

      </Navbar>

        <Container className="nt-4">
        <Routes>
          <Route path="/" element={<Doadores/>}></Route>
          <Route path="/listar" element={<Lista/>}></Route>
        </Routes>
        </Container>
    </>
  )
}

export default App
