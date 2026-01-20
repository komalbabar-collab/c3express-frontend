import React from 'react';
import "./trackingtable.css"
const TrackingTable = ({ trackingLogDetails }) => {
  // Flatten the array of arrays into a single array
  const flatTrackingDetails = trackingLogDetails.flat();

  // Group the flattened tracking details by ActivityDate
  const groupedByDate = flatTrackingDetails.reduce((acc, log) => {
    if (!acc[log.ActivityDate]) {
      acc[log.ActivityDate] = [];
    }
    acc[log.ActivityDate].push(log);
    return acc;
  }, {});

  // Render the table
  return (
    <div className="tracking-table">
      {Object.entries(groupedByDate).map(([date, logs]) => (
        <div key={date} className="date-group">
          <div className='row date-header'>
            <div className='col-md-3'>
              <div className='datee'>{date}</div>
            </div>
            <div className='col-md-6'>
              <div className='locationss'>{"Location"}</div>
            </div>
            <div className='col-md-3'>
              <div className='timeee'>{"Time"}</div>
            </div>
          </div>

          {logs.map((log, index) => (
            <div className={`log-entry ${index === 0 ? 'first' : ''}`} key={index}>
              <div className="col-md-3 log-remarks" style={{ fontSize: '13px', color: '#4e4e4e', marginLeft: '-10px' }}>{log.Remarks }{log.DeliveredTo?"-"+log.DeliveredTo:""}</div>
              <div className="col-md-6 log-location" style={{ fontSize: '13px', color: '#4e4e4e', marginLeft: '3px' }}>{log.Location}</div>
              <div className="col-md-3 log-time" style={{ fontSize: '13px', color: '#4e4e4e', marginLeft: '16px' }}>{log.ActivityTime}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TrackingTable;
