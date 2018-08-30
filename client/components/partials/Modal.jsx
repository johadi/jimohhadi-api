import React from 'react';

const dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

export const Modal = ({ message }) => (
  <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">Reading Message</h4>
        </div>
        <div className="modal-body">
          <div className="message-top pb-2 mb-2 px-3">
            <small className="text-muted">{message.name}</small>
            <small className="text-muted">{message.email}</small>
            <small className="text-muted">{new Date(message.createdAt).toLocaleString('en-us', dateOptions)}</small>
          </div>
          <p style={{ marginBottom: '0', fontWeight: 'bold' }} className="text-center">{message.subject}</p>
          <p>{message.message}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
);
