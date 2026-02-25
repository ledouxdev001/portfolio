package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepo userRepo;
    @Autowired private ProfileRepo profileRepo;
    @Autowired private SkillCategoryRepo skillCatRepo;
    @Autowired private ExperienceRepo expRepo;
    @Autowired private ProjectRepo projectRepo;
    @Autowired private EducationRepo eduRepo;
    @Autowired private LanguageRepo langRepo;
    @Autowired private QualityRepo qualityRepo;
    @Autowired private PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        // Admin user
        if (!userRepo.existsByUsername("admin")) {
            User u = new User();
            u.setUsername("admin");
            u.setPassword(encoder.encode("Admin@2025"));
            u.setEmail("ledouxdev001@gmail.com");
            u.setFullName("Dorcel Le Doux Fopa");
            u.setRole("ADMIN");
            userRepo.save(u);
        }

        // Profile
        if (profileRepo.count() == 0) {
            Profile p = new Profile();
            p.setFirstName("DORCEL");
            p.setLastName("LE DOUX FOPA");
            p.setJobTitle("Developpeur Web Full Stack - Recherche de Stage");
            p.setDescription("Etudiant en master 1 passionne par le developpement Full Stack. Capable de concevoir des API REST, developper des interfaces modernes et d'automatiser le deploiement via CI/CD et conteneurs.");
            p.setPhone("+33 7 46 38 73 59");
            p.setEmail("ledouxdev001@gmail.com");
            p.setWebsite("https://ledoux-fopa-media.vercel.app/");
            p.setLocation("France - Mobilite nationale");
            p.setAvailability("4-6 mois");
            p.setYearsExp("3+");
            profileRepo.save(p);
        }

        // Skills
        if (skillCatRepo.count() == 0) {
            String[][] cats = {
                {"Backend",        "Java,Python,Spring Boot,Maven,FastAPI,Spring Security"},
                {"Frontend",       "React,Angular,TypeScript,JavaScript"},
                {"Cloud",          "AWS EC2,CodePipeline,CodeBuild,CodeDeploy,SonarCloud,CloudWatch"},
                {"DevOps",         "Docker,Docker Compose,GitLab CI/CD,Linux Ubuntu,Nginx"},
                {"Bases de donnees","MySQL,PostgreSQL,UML,MERISE"},
                {"Tests & Qualite","JUnit,Mockito,DBUnit,SonarQube"},
                {"Outils",         "Git,VS Code,IntelliJ,Postman,Jira"}
            };
            int order = 0;
            for (String[] cat : cats) {
                SkillCategory sc = new SkillCategory();
                sc.setName(cat[0]);
                sc.setDisplayOrder(order++);
                int idx = 0;
                for (String itemName : cat[1].split(",")) {
                    SkillItem si = new SkillItem();
                    si.setName(itemName.trim());
                    si.setDisplayOrder(idx++);
                    si.setCategory(sc);
                    sc.getItems().add(si);
                }
                skillCatRepo.save(sc);
            }
        }

        // Experiences
        if (expRepo.count() == 0) {
            Experience e1 = new Experience();
            e1.setDateRange("08/2022 -> 10/2025");
            e1.setCompany("HOGO GROUP Inc. - Montreal, Canada");
            e1.setRole("Developpeur Web Full Stack");
            e1.setDisplayOrder(0);
            String[] tasks1 = {
                "Developpement et maintenance d'applications web",
                "Containerisation et deploiement sur serveurs Linux",
                "Mise en place de pipelines CI/CD",
                "Optimisation et maintenance des bases de donnees",
                "Travail en Agile/Scrum",
                "Participation aux revues de code et a la documentation"
            };
            for (int i = 0; i < tasks1.length; i++) {
                ExperienceTask t = new ExperienceTask();
                t.setDescription(tasks1[i]);
                t.setDisplayOrder(i);
                t.setExperience(e1);
                e1.getTasks().add(t);
            }
            expRepo.save(e1);

            Experience e2 = new Experience();
            e2.setDateRange("02/2021 -> 05/2021");
            e2.setCompany("KT CENTER - Douala, Cameroun");
            e2.setRole("Stagiaire Developpeur Web");
            e2.setDisplayOrder(1);
            String[] tasks2 = {
                "Conception d'interfaces web (UI) et integration frontend",
                "Participation a la creation d'une API de paiement en ligne"
            };
            for (int i = 0; i < tasks2.length; i++) {
                ExperienceTask t = new ExperienceTask();
                t.setDescription(tasks2[i]);
                t.setDisplayOrder(i);
                t.setExperience(e2);
                e2.getTasks().add(t);
            }
            expRepo.save(e2);
        }

        // Projects
        if (projectRepo.count() == 0) {
            String[][] projs = {
                {"Applications de Gestion", "Systemes E-commerce, gestion de stocks, assurance et finances - architectures full stack completes.", ""},
                {"Mini-Langage",            "Conception d'un mini-langage avec parser et interpreteur.", ""},
                {"Plateforme IA Learning",  "Plateforme qui genere des parcours d'apprentissage personnalises via IA.", ""}
            };
            for (int i = 0; i < projs.length; i++) {
                Project proj = new Project();
                proj.setName(projs[i][0]);
                proj.setDescription(projs[i][1]);
                proj.setLink(projs[i][2]);
                proj.setDisplayOrder(i);
                projectRepo.save(proj);
            }
        }

        // Education
        if (eduRepo.count() == 0) {
            String[][] edus = {
                {"11/2025 - Aujourd'hui", "Master 1 - Architecture & Developpement Logiciel", "Ecole IT - Specialisation Data et IA"},
                {"10/2021 - 07/2022",     "Licence Professionnelle - Genie Logiciel",          "ISTA"}
            };
            for (int i = 0; i < edus.length; i++) {
                Education edu = new Education();
                edu.setPeriod(edus[i][0]);
                edu.setDegree(edus[i][1]);
                edu.setSchool(edus[i][2]);
                edu.setDisplayOrder(i);
                eduRepo.save(edu);
            }
        }

        // Languages
        if (langRepo.count() == 0) {
            Language l1 = new Language();
            l1.setName("Francais"); l1.setLevel("C1 - Langue maternelle"); l1.setProficiencyPct(100); l1.setDisplayOrder(0);
            langRepo.save(l1);

            Language l2 = new Language();
            l2.setName("Anglais"); l2.setLevel("B2 - Bilingue"); l2.setProficiencyPct(75); l2.setDisplayOrder(1);
            langRepo.save(l2);
        }

        // Qualities
        if (qualityRepo.count() == 0) {
            String[] qs = {"Autonome", "Curieux", "Esprit d'equipe", "Esprit d'analyse", "Apprentissage rapide"};
            for (int i = 0; i < qs.length; i++) {
                Quality q = new Quality();
                q.setName(qs[i]);
                q.setDisplayOrder(i);
                qualityRepo.save(q);
            }
        }
    }
}
