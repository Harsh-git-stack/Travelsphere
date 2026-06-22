function TourCard({ tour, mapUrl, onViewDetails }) {
  return (
    <article className="tour-card">
      {tour.image && (
        <img
          src={tour.image}
          alt={tour.title}
          className="tour-card__image"
        />
      )}
      <div className="tour-card__content">
        <p className="tour-card__location">{tour.state || tour.location}</p>
        <h4>{tour.title}</h4>
        {tour.region && <p className="tour-card__meta">{tour.region}</p>}
        {tour.bestTime && <p className="tour-card__meta">Best time: {tour.bestTime}</p>}
        {tour.highlights && (
          <div className="tour-card__chips">
            {tour.highlights.slice(0, 3).map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        )}
      </div>
      <div className="tour-card__actions">
        <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">
          Map
        </a>
        <button className="site-button site-button--compact" type="button" onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </article>
  );
}

export default TourCard;
