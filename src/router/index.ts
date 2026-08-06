import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '@/views/HomeView.vue'
import EducationView from '@/views/EducationView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import AdminProjectsView from "@/views/AdminProjectsView.vue";
import EducationDetailView from "@/views/EducationDetailView.vue";
import EditProjectView from "@/views/EditProjectView.vue";
import HomeAdminView from "@/views/HomeAdminView.vue";
import CreateProjectView from "@/views/CreateProjectView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminEducationView from "@/views/AdminEducationView.vue";
import EditEducationView from "@/views/EditEducationView.vue";
import CreateEducationView from "@/views/CreateEducationView.vue";
import AdminProfileView from "@/views/AdminProfileView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import CreateProfileView from "@/views/CreateProfileView.vue";
import AdminSection from "@/views/AdminSection.vue";
import EditSectionView from "@/views/EditSectionView.vue";
import CreateSectionView from "@/views/CreateSectionView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Routes public
    { path: '/', name: 'home', component: HomeView},
    { path: '/education', name: 'education', component: EducationView },
    { path: '/projects', name: 'projects', component: ProjectsView },
    { path: '/projectdetail/:id', name: 'projectDetail', component: ProjectDetailView },
    { path: '/educationdetail/:id', name: 'educationDetail', component: EducationDetailView },

    // Login
    { path: '/login', name: 'login', component: LoginView },

    // Routes for Admin
    { path:'/admin',name:'admin',component:HomeAdminView, meta:{ requiresAuth: true} },
    { path:'/admin/projects',name:'projectAdmin', component:AdminProjectsView, meta: { requiresAuth: true } },
    { path:'/admin/project/edit/:id',name:'projectEdit', component:EditProjectView,  meta: { requiresAuth: true } },
    { path:'/admin/project/create',name:'projectCreate',component:CreateProjectView,  meta: { requiresAuth: true }},
    { path:'/admin/educations',name:'educationAdmin',component:AdminEducationView, meta: { requiresAuth: true } },
    { path:'/admin/education/edit/:id', name:'educationEdit', component:EditEducationView, meta: { requiresAuth: true }},
    { path:'/admin/education/create',name:'educationCreate', component:CreateEducationView,  meta: { requiresAuth: true } },
    { path:'/admin/profile', name:'profileAdmin', component: AdminProfileView,meta: { requiresAuth: true } },
    { path:'/admin/profile/create', name:'profileCreate', component:CreateProfileView,meta: { requiresAuth: true } },
    { path:'/admin/profile/edit/:id', name:'profileEdit', component: EditProfileView, meta: { requiresAuth: true } },
    { path:'/admin/section',name:'sectionAdmin',component:AdminSection, meta: { requiresAuth: true } },
    { path:'/admin/section/edit/:id', name:'sectionEdit', component:EditSectionView, meta: { requiresAuth: true } },
    { path: '/admin/section/create', name:'sectionCreate', component:CreateSectionView, meta: { requiresAuth: true } },
  ],
})

// Guard
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth) {
    await auth.checkAuth()
    if (!auth.isAuthenticated) {
      return { name: 'login' }
    }
  }
})


export default router
