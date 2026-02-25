package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name") private String firstName;
    @Column(name = "last_name")  private String lastName;
    @Column(name = "job_title")  private String jobTitle;
    @Column(length = 1000)       private String description;
    private String phone;
    private String email;
    private String website;
    private String location;
    private String availability;
    @Column(name = "years_exp")  private String yearsExp;

    public Profile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String v) { this.firstName = v; }
    public String getLastName() { return lastName; }
    public void setLastName(String v) { this.lastName = v; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String v) { this.jobTitle = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { this.description = v; }
    public String getPhone() { return phone; }
    public void setPhone(String v) { this.phone = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { this.email = v; }
    public String getWebsite() { return website; }
    public void setWebsite(String v) { this.website = v; }
    public String getLocation() { return location; }
    public void setLocation(String v) { this.location = v; }
    public String getAvailability() { return availability; }
    public void setAvailability(String v) { this.availability = v; }
    public String getYearsExp() { return yearsExp; }
    public void setYearsExp(String v) { this.yearsExp = v; }
}
