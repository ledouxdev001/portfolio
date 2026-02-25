package com.portfolio.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_range")
    private String dateRange;

    private String company;
    private String role;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("displayOrder ASC")
    private List<ExperienceTask> tasks = new ArrayList<>();

    public Experience() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDateRange() { return dateRange; }
    public void setDateRange(String v) { this.dateRange = v; }
    public String getCompany() { return company; }
    public void setCompany(String v) { this.company = v; }
    public String getRole() { return role; }
    public void setRole(String v) { this.role = v; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer v) { this.displayOrder = v; }
    public List<ExperienceTask> getTasks() { return tasks; }
    public void setTasks(List<ExperienceTask> tasks) { this.tasks = tasks; }
}
