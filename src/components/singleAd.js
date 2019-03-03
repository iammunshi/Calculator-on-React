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
    CustomInput,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import { loginFB, getAds, getAdsWithSearch, getCategories, getAdsByCategory, getAdById } from '../config/firebase';


class SingleAd extends Component {
    constructor(props) {
        super(props)
        console.log(props.location.state)
        this.state = {
            ad: {
                images: []

            },
            activeIndex: 0
        }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
        // this.search = this.search.bind(this)
        // this.searchByCategory = this.searchByCategory.bind(this);
        // this.getAds = this.getAds.bind(this);
        // this.getAdById = this.getAdById.bind(this);
    }
    onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
          const {ad} = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === ad.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        const {ad} = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? ad.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }
    // async componentDidMount() {
    //     const data = await getAds();
    //     const categories = await getCategories();
    //     this.setState({
    //         ads: data,
    //         categories
    //     })
    // }
    // async getAds(){
    //     const data = await getAds();
    //     const categories = await getCategories();
    //     this.setState({
    //         ads: data,
    //         categories
    //     })
    // }
    // async search(e) {
    //     const data = await getAdsWithSearch(e.target.value);
    //     this.setState({
    //         ads: data
    //     })
    // }
    // async searchByCategory(e){
    //     const data = await getAdsByCategory(e.target.value)
    //     this.setState({
    //         ads: data
    //     })
    // }
    async componentDidMount() {
        const ad = await getAdById(this.props.location.state.id)
        this.setState({
            ad
        })
    }
    render() {
        const { activeIndex } = this.state;
        const { ad } = this.state;
        const slides = ad.images.map((item) => {
            return (
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item}
              >
                <img height="250" src={item} />
              </CarouselItem>
            );
          });
        return (
            <div>
                <Container fluid="true">
                    <hr />
                    <Row>
                        <Col md="6">
                            <h3>{ad.title}</h3>
                        </Col>
                        <Col md="6">
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators items={ad.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SingleAd;