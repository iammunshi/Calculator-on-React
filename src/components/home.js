import React, { Component } from 'react';
import {
    Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CustomInput
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory } from '../config/firebase';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            ads: [],
            categories: []
        }
        this.search = this.search.bind(this)
        this.searchByCategory = this.searchByCategory.bind(this);
    }

    async componentDidMount() {
        const data = await getAds();
        const categories = await getCategories();
        this.setState({
            ads: data,
            categories
        })
    }
    async search(e) {
        const data = await getAdsWithSearch(e.target.value);
        this.setState({
            ads: data
        })
    }
    async searchByCategory(e){
        const data = await getAdsByCategory(e.target.value)
        this.setState({
            ads: data
        })
    }
    render() {
        const { ads, categories } = this.state;
        console.log("ADS>>>>>>>>>>>>>>", ads)
        return (
            <div>
                <Container fluid="true">
                    <hr />
                    <Row>
                        <Col md="2">
                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Search</h4>
                                        <FormGroup>
                                            <Input type="text" name="search" placeholder="Enter keyword" onChange={this.search} />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>

                            <Card style={{ marginBottom: 20 }}>
                                <CardBody>
                                    <Form>
                                        <h4>Categories</h4>
                                        <FormGroup>
                                            <div>
                                                {categories.map((element, key)=>{
                                                    return <CustomInput id={key} name="customRadio" type="radio" value={element} label={element} onClick={this.searchByCategory}/>
                                                })}
                                                {/* <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Select this custom radio" />
                                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Or this one" />
                                                <CustomInput type="radio" id="exampleCustomRadio3" label="But not this disabled one" disabled /> */}
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="10">
                            <Row>
                                {
                                    ads.map(element => {
                                        return <Col md="3" style={{ marginBottom: 10 }}>
                                            <Card>
                                                <CardImg top height="120" width="100%" src={element.images[0]} alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle>{element.title}</CardTitle>
                                                    <CardSubtitle>Price: {element.price}</CardSubtitle>
                                                    <CardText>{element.description}</CardText>
                                                    <Button>View</Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;