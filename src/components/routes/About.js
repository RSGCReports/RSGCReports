import React, { useRef } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import '../../styles/About.css';

const About = () => {
  const overview = useRef(null);
  const teamInfo = useRef(null);

  return (
    <>
      <div className="about-jumbotron">
        <Container>
          <h1>Got into a Collision?</h1>
          <h3>Tired of filling out confusing reports?</h3>
          <p>
            The process of filing collision report forms can be tedious, so here we provide a more
            user friendly and communicative platform to file your report!
          </p>
          <div className="learn-more">
            <button
              onClick={() => overview.current.scrollIntoView({ behavior: 'smooth' })}
              className="about-scroll"
            >
              MORE ABOUT US
              <br />
              <div className="svg-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  className="bi bi-arrow-bar-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                </svg>
              </div>
            </button>
          </div>
        </Container>
      </div>

      <div ref={overview} className="about-more">
        <Container>
          <h2>OVERVIEW</h2>
          <br />
          <div className="requirements">
            <p>
              RSGC is a report service generator for collisions based in Toronto, Ontario. We aim to
              reduce the inconvenience and time required to complete the process of collision
              reports for vehicle collision damages worth less than $2,000. By registering here, you
              will be able to file and submit a report to a collision centre virtually, with just a
              couple of clicks.
            </p>
            <p>
              RSGC is led by an amazing team and founders, Stefan Frunza, Rudy Chung, Genevieve
              Clare Calma, and Chen-Yuan Chu as of 2022.
            </p>
            <Button
              onClick={() => teamInfo.current.scrollIntoView({ behavior: 'smooth' })}
              className="team-scroll"
            >
              GET TO KNOW MORE ABOUT OUR TEAM
            </Button>
            <br />
            <h5>REQUIREMENTS TO FILE A VEHICLE COLLISION REPORT</h5>
            <p>If you are involved in a vehicle collision:</p>
            <ul>
              <li>Cost of damages for both vehicles should be $2,000 or less</li>
              <li>Check for injuries (no severe injuries)</li>
              <li>Take photos of the damages</li>
              <li>
                Exchange information with parties involved (other drivers / witnesses / pedestrians)
              </li>
              <ul>
                <li>Drivers License Number(s)</li>
                <li>Name and contact information</li>
                <li>License Plate Number(s)</li>
              </ul>
              <li>Take note of the weather and road conditions</li>
              <li>Take note of Date, Time and Place</li>
            </ul>
            <p>otherwise...</p>
            <h6>CALL 911 IMMEDIATELY IF</h6>
            <ul>
              <li>Someone is injured</li>
              <li>Cost of damages for both vehicles is over $2,000</li>
              <li>Any drivers have committed a criminal offence</li>
            </ul>
          </div>
        </Container>
      </div>

      <div className="other-resources">
        <Container>
          <h2>More about Reporting Collisions</h2>
          <h4>What to do:</h4>
          <Row xs={1} md={3}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Toronto Police Service</Card.Title>
                  <Card.Subtitle>Collision Reporting</Card.Subtitle>
                  <Card.Text>
                    More information and tips from the Toronto Police Service on what to do after a
                    collision...
                  </Card.Text>
                  <Card.Link href="https://www.tps.ca/services/collision-reporting/">
                    Toronto Police Services - Collision Reporting
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Accident Support Services International Ltd.</Card.Title>
                  <Card.Subtitle>Find a collision reporting centre</Card.Subtitle>
                  <Card.Text>
                    More about what is required to file a collision report and where to find the
                    nearest report centre...
                  </Card.Text>
                  <Card.Link href="https://accsupport.com/">
                    Find a Collision Reporting Centre
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Reporting An Accident In Ontario</Card.Title>
                  <Card.Subtitle>Latest article on reporting an accident</Card.Subtitle>
                  <Card.Text>
                    More information regarding what to do during and after you are involved in a
                    vehicle collision. As well as the specific fines and convictions...
                  </Card.Text>
                  <Card.Link href="https://www.thinkinsure.ca/insurance-help-centre/car-accident-reporting-in-ontario.html#:~:text=By%20law%20in%20Ontario%2C%20if,if%20there%20is%20no%20damage">
                    Article on Reporting an Accident
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div ref={teamInfo} className="team-info">
        <Container>
          <h2>RSGC Team</h2>
          <h5>Get to know our team!</h5>
          <Row xs={1} md={4}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Stefan Frunza</Card.Title>
                  <Card.Subtitle>Team Leader and Developer</Card.Subtitle>
                  <Card.Text>About you and contact...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Rudy Chung</Card.Title>
                  <Card.Subtitle>Developer</Card.Subtitle>
                  <Card.Text>About you and contact...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Genevieve Calma</Card.Title>
                  <Card.Subtitle>Front-End Developer</Card.Subtitle>
                  <br />
                  <Card.Text>
                    Contact me at <br />
                    gccalma@myseneca.ca
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Chen-Yuan Chu</Card.Title>
                  <Card.Subtitle>Developer</Card.Subtitle>
                  <Card.Text>About you and contact...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
