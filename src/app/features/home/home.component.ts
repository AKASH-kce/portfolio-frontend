import { Component } from '@angular/core';
import { SkillsComponent } from '../skills/skills.component';
import { ProfileCardComponent, SocialLink } from '../../shared/components/profile-card.component/profile-card.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ContactPopupComponent } from '../../shared/components/contact-popup.component';
import { Contact } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [SkillsComponent, ProfileCardComponent, ProjectsComponent, ExperienceComponent, ContactPopupComponent,Contact],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showComingSoonPopup = false;
  comingSoonPopupX = 0;
  comingSoonPopupY = 0;

  socialLinks: SocialLink[] = [
    { icon: 'fab fa-github', url: 'https://github.com/AKASH-kce' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/akash-s2003?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/_itz_me_akash_3?igsh=MXV5ZjM4MmlmdTloYQ%3D%3D&utm_source=qr' },
    { icon: 'fas fa-code', url: 'https://leetcode.com/u/akash_kce/' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/916374252235?text=Hi%20Akash!%20I%20found%20your%20portfolio.', comingSoon: true }
  ];

  onSocialLinkClick(event: MouseEvent, link: any) {
    if (link.comingSoon) {
      event.preventDefault();
      this.comingSoonPopupX = event.clientX;
      this.comingSoonPopupY = event.clientY;
      this.showComingSoonPopup = true;
    }
  }

  closeComingSoonPopup() {
    this.showComingSoonPopup = false;
  }
}
