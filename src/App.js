import React, {Component} from 'react';
import axios from 'axios';
import PeopleItem from './PeopleItem';
import './App.scss';
import spinner from './images/spinner.svg';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            peopleList: [],
            filteredPeople: [],
            selectedProfile: null,
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        axios.get('https://randomuser.me/api/?results=20')
            .then(result => {
                if (result.data) {
                    const peopleList = result.data.results.map(item => {
                        return {
                            name: `${this.capitalizeFirstLetter(item.name.first)} ${this.capitalizeFirstLetter(item.name.last)}`,
                            pic: item.picture.large,
                            job: item.login.username,
                            bio: item.location.state + item.location.city + item.location.street,
                            direction: this.capitalizeFirstLetter(item.name.title),
                            email: item.email,
                            phone: item.phone
                        }
                    });

                    this.setState({
                        peopleList,
                        filteredPeople: peopleList,
                        loading: false
                    });
                }
            });
    }

    capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    selectProfile = (index) => {
        const selectedProfile = this.state.filteredPeople ? this.state.filteredPeople[index] : null;
        this.setState({
            selectedProfile
        });
    };

    onChangeSearchBox = e => {
        const exp = new RegExp(`${e.target.value}`);
        const filteredPeople = this.state.peopleList.filter(item => exp.test(item.name.toLowerCase()));
        this.setState({
            filteredPeople,
            selectedProfile: filteredPeople[0]
        });
    };

    render() {
        let { filteredPeople, selectedProfile, loading } = this.state;
        if (!selectedProfile) {
            selectedProfile = filteredPeople[0];
        }

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Peoples
                    </p>
                </header>

                {
                    loading ? (
                        <div className="loading-container">
                            <img src={spinner} />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="container">
                                    <div className="dashboard-container">
                                        <div className="left-container">
                                            <label className="title">Users</label>
                                            <p className="description">If you want to get contact information to specific user, just select group and then
                                                select him from the list below</p>

                                            <div className="d-flex mt-3 align-items-md-center">
                                                <label className="mr-3">Search users: </label>
                                                <input type="text" className="search-box" name="search-box" onChange={this.onChangeSearchBox}/>
                                            </div>

                                            <div className="d-flex people-list">
                                                {filteredPeople && (
                                                    filteredPeople.map((people, index) =>
                                                        <PeopleItem
                                                            index={index}
                                                            person={people}
                                                            selectProfile={this.selectProfile}
                                                            selected={selectedProfile.email == people.email}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="right-container">
                                            {
                                                selectedProfile ? (
                                                    <div>
                                                        <div className="d-flex profile-image-container">
                                                            <div className="profile-image-background">
                                                                <img className="profile-image" src={selectedProfile.pic} />
                                                            </div>

                                                            <div className="profile-image-small">
                                                                <img src={selectedProfile.pic} />
                                                            </div>

                                                            <h5 className="color-white mt-4">{selectedProfile.name}</h5>
                                                            <p className="color-white">{selectedProfile.job}</p>
                                                        </div>

                                                        <div className="d-flex profile-information">
                                                            <div className="profile-info-row">
                                                                <div className="profile-info-label">Short Bio</div>
                                                                <div className="profile-info-detail">{selectedProfile.bio}</div>
                                                            </div>

                                                            <div className="profile-info-row">
                                                                <div className="profile-info-label">The direction of the profession</div>
                                                                <div className="profile-info-detail">{selectedProfile.direction}</div>
                                                            </div>

                                                            <div className="profile-info-row">
                                                                <div className="profile-info-label">Email Address</div>
                                                                <div className="profile-info-detail">{selectedProfile.email}</div>
                                                            </div>

                                                            <div className="profile-info-row">
                                                                <div className="profile-info-label">Phone number</div>
                                                                <div className="profile-info-detail">{selectedProfile.phone}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default App;
