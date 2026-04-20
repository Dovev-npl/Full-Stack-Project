function TeamMemberCard({ member }) {
  return (
    <article className="team-card">
      <img className="team-card__image" src={member.image} alt={member.alt} />
      <h3 className="team-card__name">{member.name}</h3>
      <p className="team-card__role">{member.role}</p>
    </article>
  );
}

export default TeamMemberCard;
