import { BandMember } from '../../types';
import './MemberTile.css';

interface MemberTileProps {
  member: BandMember;
}

export function MemberTile({ member }: MemberTileProps) {
  return (
    <figure className="member-tile">
      <img src={member.image} alt={member.name} className="member-tile-img" loading="lazy" />
      <figcaption className="member-tile-caption">
        <span className="member-tile-name">{member.name}</span>
        <span className="member-tile-role">{member.role}</span>
      </figcaption>
    </figure>
  );
}
