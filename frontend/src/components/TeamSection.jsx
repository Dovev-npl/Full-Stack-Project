import TeamMemberCard from "./TeamMemberCard.jsx";

function TeamSection({ members }) {
  return (
    <section className="team-section" id="team" aria-labelledby="team-title">
      <h2 className="team-section__title" id="team-title">
        Meet the Team
      </h2>
      <div className="team-grid">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
