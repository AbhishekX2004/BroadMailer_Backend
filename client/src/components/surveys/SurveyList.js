import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

const SurveyList = ({ fetchSurveys, surveys }) => {
    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    function renderSurveys() {
        return surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            Subject : {survey.subject}
                        </p>
                        <p>
                            {survey.body}
                        </p>
                        <p className='right'>
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href='#'>Yes: {survey.yes}</a>
                        <a href='#'>No: {survey.no}</a>
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

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
