import React, {useState} from "react";
import {Badge, Card, Col, Container, Row,} from "react-bootstrap";

const detailsRecords = [{
    id: 1,
    name: "John Doe",
    about: "Nice guy",
    hobby: "Likes drinking wine",
    skills: ["html", "javascript", "redux"]
},{
    id: 2,
    name: "Mary Moe",
    about: "Cute girl",
    hobby: "Likes playing xbox whole days long",
    skills: ["Fortran", "Lua", "R#"]
}];


function UserDetail({user}) {
    return (
        <Container>
            <Row>
                <Col md={{span:"8", offset:"2"}} lg={{span:"6", offset:"3"}}>
                    <Card>
                        <Card.Body>
                            <Col sm={"12"}>
                                <Col xs={"12"} sm={"8"}>
                                    <h2>{user.name}</h2>
                                    <p><strong>About: </strong>{user.about}</p>
                                    <p><strong>Hobbies: </strong>{user.hobby}</p>
                                    <p><strong>Skills: </strong>
                                        {user.skills.map((s, i) => (
                                            <Badge key={i}>{s}</Badge>
                                        ))}
                                    </p>
                                </Col>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default function UserDetails() {
    const[details, setDetails] = useState(detailsRecords);

    return (
        <div>
            {details.map((user, index) => <UserDetail key={index} user={user}/>)}
        </div>
    );
}