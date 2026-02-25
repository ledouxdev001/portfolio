package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String period;

    @Column(nullable = false)
    private String degree;

    private String school;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public Education() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer v) { this.displayOrder = v; }
}
