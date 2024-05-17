import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, delSurveys } from '../../actions';

const SurveyList = ({ fetchSurveys, delSurveys, surveys }) => {

    useEffect(() => {
        fetchSurveys();
    }, []);

    async function handleDelete(surveyId) {
        const message = await delSurveys(surveyId);
        
        // Fetch updated list of surveys after deletion
        fetchSurveys();
        
        alert("Survey Deleted Successfully", message);
    };

    function renderSurveys() {
        // Make a copy of surveys array and then reverse it
        const reversedSurveys = [...surveys].reverse();
        
        return reversedSurveys.map(survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id} style={{borderRadius: '25px'}}>
                    <div className="card-content white-text">
                        <span className="card-title" style={{fontWeight: 'bolder'}}><i>{survey.title}</i></span>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p>
                                <b>Last Response on:</b> {new Date(survey.lastResponded).toLocaleDateString()}
                            </p>
                            <p>
                                <b>Sent On:</b> {new Date(survey.dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <br />
                        <p>
                            <b>Subject:</b> {survey.subject}
                        </p>
                        <p>
                            <b>Body:</b> {survey.body}
                        </p>
                    </div>
                    <div className="card-action center surveyCardResponses" style={{fontSize:'medium'}}>
                        <a href='#'>Yes: {survey.yes}</a>
                        <a href='#'>No: {survey.no}</a>

                        {/* button to delete the survey */}
                        <button onClick={() => handleDelete(survey._id)} className='btn-floating btn-small waves-effect waves-light red darken-2 right'>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            {renderSurveys()}
        </div>
    );
};

const mapStateToProps = ({ surveys }) => {
    return { surveys: surveys };
};

export default connect(mapStateToProps, { fetchSurveys, delSurveys })(SurveyList);
