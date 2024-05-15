import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {RoleService} from "../zynerator/security/shared/service/Role.service";
import {AppComponent} from "../app.component";
import {AuthService} from "../zynerator/security/shared/service/Auth.service";
import {Router} from "@angular/router";
import {AppLayoutComponent} from "./app.layout.component";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelanonymous: any[];
    modelAdmin: any[];
constructor(public layoutService: LayoutService, public app: AppComponent, public appMain: AppLayoutComponent, private roleService: RoleService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.modelAdmin =
      [

				{

                    items: [
					  {
						label: 'Project Management',
						icon: 'pi pi-folder mr-2',
						items: [
                                  {
                                    label: 'Liste projet',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/nro/projet/list']
                                  },
                                  {
                                    label: 'Liste nro',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/nro/nro/list']
                                  },
								  {
									label: 'Liste sro',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/sro/sro/list']
								  },

						]
					  },
                        {
                            label: 'Team Management',
                            icon: 'pi pi-users mr-2',
                            items: [
                                {
                                    label: 'Liste equipe',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/equipe/equipe/list']
                                },
                                {
                                    label: 'Liste type equipe',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/equipe/type-equipe/list']
                                },
                                {
                                    label: 'Liste membre equipe',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/equipe/membre-equipe/list']
                                },

                            ]
                        },
                        {
                            label: 'Task Management',
                            icon: 'pi pi-list mr-2',
                            items: [
                                {
                                    label: 'Liste tache',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/tache/tache/list']
                                },
                                {
                                    label: 'Liste type tache',
                                    icon: 'pi pi-fw pi-plus-circle',
                                    routerLink: ['/app/admin/tache/type-tache/list']
                                },
                            ]
                        },
					  {
						label: 'Users Management',
						icon: 'pi pi-user-plus mr-2',
						items: [
								  {
									label: 'Liste collaborator',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/collaborator/list']
								  },
                                  {
                                     label: 'Liste grad',
                                     icon: 'pi pi-fw pi-plus-circle',
                                     routerLink: ['/app/admin/commun/grad/list']
                                  },
						]
					  },
				   {
					  label: 'Security Management',
					  icon: 'pi pi-lock mr-2',
					  items: [
						  {
							  label: 'List User',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/user/list']
						  },
						  {
							  label: 'List Model',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/model-permission/list']
						  },
						  {
							  label: 'List Action Permission',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/action-permission/list']
						  },
					  ]
				  }
			]
	    }
    ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roleUsers) {
              this.authService.authenticatedUser.roleUsers.forEach(role => {
                  const roleName: string = this.getRole(role.role.authority);
                  this.roleService._role.next(roleName.toUpperCase());
                  eval('this.model = this.model' + this.getRole(role.role.authority));
              })
            }
        }
  }

    getRole(text){
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
      if (!word) { return word; }
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
