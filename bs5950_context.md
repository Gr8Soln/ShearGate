# BS 5950-1:2000 — Structural Use of Steelwork in Building
## Key Sections for Bolted Connection Design

Extracted from BS 5950-1:2000 for use as AI context. Covers:
- Section 3.4.3 — Net area
- Section 4.6 — Tension members  
- Section 6 — Bolted connections (Cl 6.2.4, 6.3.1–6.3.4)
- Table 3 — Net area coefficient Ke
- Table 9 — Design strength Py
- Table 29 — Minimum edge and end distances
- Table 30 — Design shear strength ps
- Table 31 — Design tension strength pt
- Table 32 — Design bearing strength pbs
- Table 34 — Hole clearances
- Table H.1 — Tensile stress area As

---


## Section 3.4 — Local Capacity
### 3.4.3 Net Area


BS 5950-1:2000
© BSI 05-2001
27
Section 3
3.4 Section properties
3.4.1 Gross cross-section
Gross cross-section properties should be determined from the specified shape and nominal dimensions of 
the member or element. Holes for bolts should not be deducted, but due allowance should be made for larger 
openings. Material used solely in splices or as battens should not be included.
3.4.2 Net area
The net area of a cross-section or an element of a cross-section should be taken as its gross area, less the 
deductions for bolt holes given in 3.4.4.
3.4.3 Effective net area
The effective net area ae of each element of a cross-section with bolt holes should be determined from:
ae = Kean
but
ae  ag
in which the effective net area coefficient Ke is given by:
where
3.4.4 Deductions for bolt holes
3.4.4.1 Hole area
In deducting for bolt holes (including countersunk holes), the sectional area of the hole in the plane of its 
own axis should be deducted, not that of the bolt.
3.4.4.2 Holes not staggered
Provided that the bolt holes are not staggered, the area to be deducted should be the sum of the sectional 
areas of the bolt holes in a cross-section perpendicular to the member axis or direction of direct stress.
3.4.4.3 Staggered holes
Where the bolt holes are staggered, the area to be deducted should be the greater of:
a) the deduction for non-staggered holes given in 3.4.4.2;
b) the sum of the sectional areas of a chain of holes lying on any diagonal or zig-zag line extending 
progressively across the member or element, see Figure 3, less an allowance of 0.25s2t/g for each gauge 
space g that it traverses diagonally, where:
For sections such as angles with holes in both legs, the gauge spacing g should be taken as the sum of the 
back marks to each hole, less the leg thickness, see Figure 4.
— for grade S 275:
Ke = 1.2
— for grade S 355:
Ke = 1.1
— for grade S 460:
Ke = 1.0
— for other steel grades:
Ke = (Us/1.2)/py
ag
is the gross area of the element;
an
is the net area of the element;
py
is the design strength;
Us
is the specified minimum tensile strength.
g
is the gauge spacing perpendicular to the member axis or direction of direct stress, between the 
centres of two consecutive holes in the chain, see Figure 3;
s
is the staggered pitch, i.e. the spacing parallel to the member axis or direction of direct stress, 
between the centres of the same two holes, see Figure 3;
t
is the thickness of the holed material.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
28
© BSI 05-2001
Section 3
on line A:
An = t[b – 2D]
on line B:
An = t[b – 3D + 0.25s22/g1]
on line C:
An = t[b – 4D + 0.5s22/g1 + 0.25s22/g2]
where D is the hole diameter.
Figure 3 — Staggered holes
Figure 4 — Angle with holes in both legs
A
C
B
Direction of
direct stress
b  
s1
s2
s1
s2
g1
g2
g1
Back mark
Back mark
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 3 — Net Area Coefficient Ke


BS 5950-1:2000
© BSI 05-2001
17
Section 2
where
In addition, the maximum thickness of the component should not exceed the maximum thickness t2 at 
which the full Charpy impact value applies to the selected steel quality for that product type and steel 
grade, according to the relevant product standard, see Table 6.
For rolled sections t and t1 should be related to the same element of the cross-section as the factor K, but 
t2 should be related to the thickest element of the cross-section.
Alternatively, the value of t1 may be determined from the following:
— if T27J  Tmin + 20 ºC:
— if T27J  > Tmin + 20 ºC:
in which:
where
Table 3 — Factor K for type of detail, stress level and strain conditions
K
is a factor that depends on the type of detail, the general stress level, the stress 
concentration effects and the strain conditions, see Table 3;
t1
is the limiting thickness at the appropriate minimum service temperature Tmin for a given 
steel grade and quality, when the factor K = 1, from Table 4 or Table 5.
Tmin
is the minimum service temperature (in ºC) expected to occur in the steel within 
the intended design life of the part;
T27J
is the test temperature (in °C) for which a minimum Charpy impact value Cv of 
27 J is specified in the product standard, or the equivalent value given in Table 7;
Ynom
is the nominal yield strength (in N/mm2) [the specified minimum yield strength 
for thickness  16 mm (or 12 mm for BS 7668), as in the steel grade designation].
Type of detail or location
Components in tension due to 
factored loads
Components not 
subject to applied 
tension 
Stress  0.3Ynom
Stress < 0.3Ynom
Plain steel
2
3
4
Drilled holes or reamed holes
1.5
2
3
Flame cut edges
1
1.5
2
Punched holes (un-reamed)
1
1.5
2
Welded, generally
1
1.5
2
Welded across ends of cover plates
0.5
0.75
1
Welded connections to unstiffened flanges, see 6.7.5 0.5
0.75
1
NOTE 1   Where parts are required to withstand significant plastic deformation at the minimum service temperature (such as 
crash barriers or crane stops) K should be halved.
NOTE 2   Baseplates attached to columns by nominal welds only, for the purposes of location in use and security in transit, should 
be classified as plain steel.
NOTE 3   Welded attachments not exceeding 150 mm in length should not be classified as cover plates.
t1
50

1.2

N
355
Ynom
-------------
1.4
t1
50

1.2

N 35
Tmin
T27J
–
+
15
------------------------------------






355
Ynom
-------------
1.4
N
Tmin
T27J
–
10
-------------------------------




	

=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 9 — Design Strength Py


BS 5950-1:2000
© BSI 05-2001
25
Section 3. Properties of materials and section 
properties
3
3.1 Structural steel
3.1.1 Design strength
This standard covers the design of structures fabricated from structural steels conforming to the grades 
and product standards specified in BS 5950-2. If other steels are used, due allowance should be made for 
variations in properties, including ductility and weldability.
The design strength py should be taken as 1.0Ys but not greater than Us /1.2 where Ys and Us are 
respectively the minimum yield strength ReH and the minimum tensile strength Rm specified in the 
relevant product standard. For the more commonly used grades and thicknesses of steel from the product 
standards specified in BS 5950-2 the value of py may be obtained from Table 9. Alternatively, the values of 
ReH  and Rm may be obtained from the relevant product standard.
NOTE   Additional requirements apply where plastic analysis is used, see 5.2.3.
Table 9 — Design strength py
3.1.2 Notch toughness
The notch toughness of the steel, as quantified by the Charpy impact properties, should conform to that for 
the appropriate quality of steel for avoiding brittle fracture, see 2.4.4.
Steel grade
Thicknessa less than or equal to
Design strength py
mm
N/mm2
S 275
16
275
40
265
63
255
80
245
100
235
150
225
S 355
16
355
40
345
63
335
80
325
100
315
150
295
S 460
16
460
40
440
63
430
80
410
100
400
a For rolled sections, use the specified thickness of the thickest element of the cross-section.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Section 4.6 — Tension Members


BS 5950-1:2000
© BSI 05-2001
71
Section 4
4.4.6  Design of intermediate transverse web stiffeners
4.4.6.1  General
Intermediate transverse stiffeners may be provided on either one or both sides of the web.
4.4.6.2  Spacing
Where intermediate transverse web stiffeners are provided, their spacing should conform to 4.4.3.
4.4.6.3  Outstand of stiffeners
The outstand of the stiffeners should conform to 4.5.1.2.
4.4.6.4  Minimum stiffness
Intermediate transverse web stiffeners not subject to external loads or moments should have a second 
moment of area Is about the centreline of the web not less than Is given by:
 
Is = 0.75dtmin3
 Is = 1.5(d/a)2dtmin3
where
4.4.6.5  Additional stiffness for external loading
If an intermediate transverse web stiffener is subject to externally applied forces, the value of Is given 
in 4.4.6.4 should be increased by adding Iext as follows:
a) for transverse forces effectively applied in line with the web:
Iext = 0  (i.e. no increase in Is)
b) for transverse forces applied eccentric to the web:
Iext = FxexD2/Et
c) for lateral forces, deemed to be applied at the level of the compression flange of the girder:
Iext = 2FhD3/Et
where
4.4.6.6  Buckling resistance
Intermediate transverse web stiffeners not subject to external forces or moments should meet the 
condition:
Fq  Pq
in which Fq is the larger value, considering the two web panels each side of the stiffener, of the compressive 
axial force given by:
Fq = V – Vcr
a
is the actual stiffener spacing;
d
is the depth of the web;
tmin
is the minimum required web thickness for the actual stiffener spacing a.
D
is the overall depth of the section;
E
is the modulus of elasticity;
ex
is the eccentricity of the transverse force from the centreline of the web;
Fh
is the external lateral force;
Fx
is the external transverse force;
t
is the actual web thickness.
for a/d
2:

for a/d
2:

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
72
© BSI 05-2001
Section 4
where
Intermediate transverse web stiffeners subject to external forces or moments should meet the conditions 
for load carrying web stiffeners given in 4.5.3.3. In addition, they should also satisfy the following:
— if Fq > Fx:
— if Fq  Fx:
in which
Ms = Fxex + FhD
where
4.4.6.7  Connection to web of intermediate stiffeners
Intermediate transverse web stiffeners that are not subject to external forces or moments should be 
connected to the web to withstand a shear between each component and the web (in kN per millimetre run) 
of not less than:
t2/(5bs)
where
If the stiffeners are subject to external forces or moments, the resulting shear between the web and the 
stiffener should be added to the above value.
Intermediate transverse web stiffeners that are not subject to external forces or moments should extend to 
the compression flange, but need not be connected to it. Intermediate transverse web stiffeners that are not 
subject to external forces or moments may terminate clear of the tension flange. In such cases the welds 
connecting the stiffener to the web should terminate not more than 4t clear of the tension flange.
4.5  Web bearing capacity, buckling resistance and stiffener design
4.5.1  General
4.5.1.1  Web stiffeners
Web stiffeners should be provided where needed at locations where unstiffened webs are subject to local 
loads or reactions, as follows:
a) bearing stiffeners, to prevent crushing of the web due to forces applied through a flange, see 4.5.2;
b) load carrying stiffeners, to resist web buckling due to concentrated loading, see 4.5.3;
c) tension stiffeners, to transmit tensile forces applied via a flange into the web, see 4.5.4;
d) intermediate transverse web stiffeners, to resist web buckling due to shear, see 4.5.5;
Pq
is the buckling resistance of the intermediate web stiffener, from 4.5.5;
V
is the shear in a web panel adjacent to the stiffener;
Vcr
is the critical shear buckling resistance [see 4.4.5.4b)] of the same web panel.
Fh
is the external lateral force, if any, see 4.4.6.5;
Fx
is the external transverse force;
Mys
is the moment capacity of the stiffener based on its section modulus;
Px
is the buckling resistance of a load carrying stiffener, see 4.5.3.3.
bs
is the outstand of the stiffener (in mm);
t
is the web thickness (in mm).
Fq
Fx
–
Pq
-------------------
Fx
Px
------
Ms
Mys
----------
+
+
1

Fx
Px
------
Ms
Mys
----------
1

+
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
73
Section 4
e) diagonal stiffeners, to provide local reinforcement of a web in shear, see 4.5.6;
f) torsion stiffeners, to provide torsional restraint at supports, see 4.5.7. 
If the same stiffeners have more than one function, they should meet the requirements for each function.
4.5.1.2  Maximum outstand of web stiffeners
Unless the outer edge of a web stiffener is itself continuously stiffened, its outstand from the face of the web 
should not exceed 19ts.
If the outstand of a stiffener is between 13ts and 19ts then its design should be based on an effective 
cross-section with an outstand of 13ts.
4.5.1.3  Stiff bearing length
The stiff bearing length b1 should be taken as the length of support that cannot deform appreciably in 
bending. To determine b1 the dispersion of load through a steel bearing should be taken as indicated in 
Figure 13. Dispersion at 45º through packs may be included provided that they are firmly fixed in place.
4.5.1.4  Eccentricity
Where a load or reaction is applied eccentric from the centreline of the web, or where the centroid of the 
stiffener does not lie on the centreline of the web, the resulting eccentricity of loading should be allowed for 
in design.
4.5.1.5  Hollow sections
Where concentrated loads are applied to hollow sections consideration should be given to local stresses and 
deformations and the section reinforced or stiffened as necessary.
NOTE   Details of a design procedure for resistance to loads or reactions applied to webs of hollow sections through a flange are       
given in reference [5], see Bibliography.
4.5.2  Bearing capacity of web
4.5.2.1  Unstiffened web
Bearing stiffeners should be provided where the local compressive force Fx applied through a flange by 
loads or reactions exceeds the bearing capacity Pbw of the unstiffened web at the web-to-flange connection, 
given by:
Pbw = (b1 + nk)tpyw
in which:
— except at the end of a member:
n = 5
— at the end of a member:
n = 2 + 0.6be/k
but
n  5
b1 = t + 1.6r + 2T
 b1 = t + 1.6s + 2T
b1 = t + T + 0.8r – g 
b1 = 0.5Dc + t + 0.8s – g
Figure 13 — Stiff bearing length
g
T
r
s
1
T
r
t
b
s
g
T
t
t
t
1
b
1
b
1
b
Dc
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
74
© BSI 05-2001
Section 4
and k is obtained as follows:
— for a rolled I- or H-section:
k = T + r
— for a welded I- or H-section:
 k = T
where
4.5.2.2  Stiffened web
Bearing stiffeners should be designed for the applied force Fx minus the bearing capacity Pbw of the 
unstiffened web. The capacity Ps of the stiffener should be obtained from:
Ps = As.netpy
in which As.net is the net cross-sectional area of the stiffener, allowing for cope holes for welding.
If the web and the stiffener have different design strengths, the smaller value should be used to calculate 
both the web capacity Pbw and the stiffener capacity Ps.
4.5.3  Buckling resistance
4.5.3.1  Unstiffened web
Load carrying web stiffeners should be provided where the local compressive force Fx applied through a 
flange by a load or reaction exceeds the buckling resistance of the web.
If the flange through which the load or reaction is applied is effectively restrained against both:
a) rotation relative to the web;
b) lateral movement relative to the other flange;
then provided that the distance ae from the load or reaction to the nearer end of the member is at least 0.7d, 
the buckling resistance of the unstiffened web should be taken as Px given by:
where
If the distance ae from the load or reaction to the nearer end of the member is less than 0.7d, the buckling 
resistance Px of the web should be taken as:
Where a) or b) is not met, the buckling resistance of the web should be reduced to Pxr given by:
in which LE is the effective length of the web, acting as a compression member or a part of a compression 
member, determined in accordance with 4.7.2 for the appropriate conditions of end restraint.
b1
is the stiff bearing length, see 4.5.1.3;
be
is the distance to the nearer end of the member from the end of the stiff bearing;
pyw
is the design strength of the web;
r
is the root radius;
T
is the flange thickness:
t
is the web thickness.
d
is the depth of the web;
Pbw
is the bearing capacity of the unstiffened web at the web-to-flange connection, from 4.5.2.1 
and b1, k, n and t are as defined in 4.5.2.1.
Px
25t
b1
nk
+

d
--------------------------------Pbw
=
Px
ae
0.7d
+
1.4d
------------------------
25t
b1
nk
+

d
--------------------------------Pbw
=
Pxr
0.7d
LE
-----------Px
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
75
Section 4
4.5.3.2  Loads applied between stiffeners
Load carrying web stiffeners should be added where the local compressive stress fed on the compression 
edge of a web, due to loads or reactions applied through a flange between the web stiffeners already 
provided, exceeds the compressive strength for edge loading ped.
For this check, the stress fed on the compression edge of a web panel of depth d between two transverse 
stiffeners of spacing a should be calculated as follows:
a) individual point loads and distributed loads shorter than the smaller panel dimension a or d should 
be divided by the smaller panel dimension;
b) for a series of similar point loads, equally spaced, divide the largest load by the spacing, or by the 
smaller panel dimension if this is less;
c) add the intensity (force/unit length) of any other distributed loads;
d) divide the sum of a), b) and c) by the web thickness t.
The compressive strength for edge loading ped should be calculated as follows:
— if the compression flange is restrained against rotation relative to the web:
— if the compression flange is not restrained against rotation relative to the web:
4.5.3.3  Buckling resistance of load carrying stiffeners
The external load or reaction Fx on a load carrying stiffener should not exceed the buckling resistance Px 
of the stiffener, given by:
Px = As pc
The effective area As of the load carrying stiffener should be taken as that of a cruciform cross-section made 
up from the effective area of the stiffeners themselves (see 4.5.1.2) together with an effective width of web 
on each side of the centreline of the stiffeners limited to 15 times the web thickness t.
The compressive strength pc should be determined from 4.7.5 using strut curve c) (see Table 24) and the 
radius of gyration of the complete cruciform area As of the stiffener about its axis parallel to the web.
The design strength py should be taken as the lower value for the web or the stiffeners. The reduction 
of 20 N/mm2 referred to in 4.7.5 should not be applied unless the stiffeners themselves are welded sections.
Provided that the flange through which the load or reaction is applied is effectively restrained against 
lateral movement relative to the other flange, the effective length LE should be taken as follows:
a) flange restrained against rotation in the plane of the stiffener by other structural elements:
LE = 0.7 times the length L of the stiffener clear between flanges;
b) flange not so restrained:
LE = 1.0 times the length L of the stiffener clear between flanges.
If the load or reaction is applied to the flange by a compression member, then unless effective lateral 
restraint is provided at that point, the stiffener should be designed as part of the compression member 
applying the load, and the connection should be checked for the effects of strut action, see C.3.
If the stiffener also acts as an intermediate transverse stiffener to resist shear buckling, it should be 
checked for the effect of combined loads in accordance with 4.4.6.6.
Load carrying stiffeners should also be checked as bearing stiffeners, see 4.5.2.2.
ped
2.75
2
a/d

2
----------------
+
=
E
d/t

2
---------------
ped
1.0
2
a/d

2
----------------
+
=
E
d/t

2
---------------
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
76
© BSI 05-2001
Section 4
4.5.4  Tension stiffeners
Tension stiffeners should be provided where the applied load or reaction exceeds either:
a) the tension capacity of the unstiffened web at its connection to the flange;
b) the tension capacity of the unstiffened flange, see 6.3.4 and 6.7.5.
The tension capacity Ptw of an unstiffened web at the web-to-flange connection should be obtained by 
dispersion through the flange to the web-to-flange connection at a slope of 1 in 2.5 to the flange.
In case a), a tension stiffener required to strengthen an unstiffened web should be designed to carry that 
portion of the applied load or reaction that exceeds the tension capacity Ptw of the unstiffened web. If the 
web and the stiffener have different design strengths, the smaller value should be used for both.
In case b), a tension stiffener required to strengthen an unstiffened flange, the proportion of the applied 
load or reaction assumed to be carried by the stiffener should be consistent with the design of the flange.
4.5.5  Intermediate transverse web stiffeners
The buckling resistance Pq of an intermediate transverse web stiffener should be determined as for the 
buckling resistance Px of a load carrying stiffener, see 4.5.3.3, except that:
— the effective length LE should be taken as 0.7 times its length L clear between flanges;
— stiffeners required only to resist shear buckling need not be checked as bearing stiffeners to 4.5.2.2.
4.5.6  Diagonal stiffeners
Diagonal stiffeners should be designed to carry that portion of the total applied shear that exceeds the 
shear capacity Pv of the member, see 4.2.3. If the web and the stiffener have different design strengths, the 
smaller value should be used for both.
4.5.7  Torsion stiffeners
Stiffeners that are required to provide torsional restraint at member supports, see 4.3.3, should have a 
second moment of area Is about the centreline of the web that satisfies the criterion:
Is  0.34sD3Tc
in which the coefficient s is given by the following:
where
4.5.8  Connection of stiffeners to webs
Web stiffeners that contribute to resisting loads or reactions applied through a flange should be connected 
to the web by welds, fitted bolts or preloaded bolts designed to be non-slip under factored loads, see 6.4.2. 
This connection should be designed to transmit a force equal to the lesser of:
a) the larger of the forces applied at either end if they act in opposite directions, or the sum of these forces 
if both act in the same direction;
b) the capacity of the stiffener, see 4.5.2.2.
— if  50:
s
=
0.006
— if 50 < 100:
s
=
0.3/
— if  > 100:
s
=
30/2

is the slenderness LE/ry of the member;
D
is the overall depth of the member at the support;
LE
is the effective length of the member in the span under consideration;
ry
is the radius of gyration about the minor axis;
Tc
is the maximum thickness of the compression flange in the span under consideration.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
77
Section 4
4.5.9  Connection of web stiffeners to flanges
4.5.9.1  Stiffeners in compression
Web stiffeners required to resist compression should either be fitted against the loaded flange or connected 
to it by continuous welds, fitted bolts or preloaded bolts designed to be non-slip under factored loads, 
see 6.4.2.
The stiffener should be fitted against, or connected to, both flanges where any of the following apply:
a) a load is applied directly over a support;
b) the stiffener forms the end stiffener of a stiffened web;
c) the stiffener acts as a torsion stiffener.
4.5.9.2  Stiffeners in tension
Web stiffeners required to resist tension should be connected to the flange transmitting the load or reaction 
by continuous welds, fitted bolts or preloaded bolts designed to be non-slip under factored loads, see 6.4.2. 
This connection should be designed to resist the lesser of the applied load or reaction or the capacity of the 
stiffener, see 4.5.2.2.
4.5.10  Length of web stiffeners
Bearing stiffeners or tension stiffeners that do not also have other functions, see 4.5.1.1, may be curtailed 
where the capacity Pus of the unstiffened web beyond the end of the stiffener is not less than the proportion 
of the applied load or reaction carried by the stiffener. The capacity Pus of the unstiffened web at this point 
should be obtained from:
Pus = (b1 + w)tpyw
where
The length of a stiffener that does not extend right across the web should also be such that the local shear 
stress in the web due to the force transmitted by the stiffener does not exceed 0.6pyw.
4.6  Tension members
4.6.1  Tension capacity
The tension capacity Pt of a member should generally be obtained from:
Pt = pyAe
in which Ae is the sum of the effective net areas ae of all the elements of the cross-section, determined 
from 3.4.3, but not more than 1.2 times the total net area An.
4.6.2  Members with eccentric connections
If members are connected eccentric to their axes, the resulting moments should generally be allowed for in 
accordance with 4.8.2. However, angles, channels or T-sections with eccentric end connections may be 
treated as axially loaded by using the reduced tension capacity given in 4.6.3.
4.6.3  Simple tension members
4.6.3.1  Single angle, channel or T-section members
For a simple tie, designed as axially loaded, consisting of a single angle connected through one leg only, a 
single channel connected only through the web or a T-section connected only through the flange, the tension 
capacity should be obtained as follows:
in which:
a2 = Ag – a1
b1
is the stiff bearing length, see 4.5.1.3;
w
is the length obtained by dispersion at 45° to the level at which the stiffener terminates.
— for bolted connections:
Pt = py(Ae – 0.5a2)
— for welded connections:
Pt = py(Ag – 0.3a2)
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
78
© BSI 05-2001
Section 4
where
4.6.3.2  Double angle, channel or T-section members
For a simple tie, designed as axially loaded, consisting of two angles connected through one leg only, two 
channels connected only through the web or two T-sections connected only through the flange, the tension 
capacity should be obtained as follows:
a) if the tie is connected to both sides of a gusset or section and the components are interconnected by 
bolts or welds and held apart and longitudinally parallel by battens or solid packing pieces in at least two 
locations within their length, the tension capacity per component should be obtained from:
— for bolted connections:
Pt = py(Ae – 0.25a2)
— for welded connections:
Pt = py(Ag – 0.15a2)
b) if the components are both connected to the same side of a gusset or member, or not interconnected as 
given in a), the tension capacity per component should be taken as given in 4.6.3.1.
In case a) the outermost interconnection should be within a distance from each end of ten times the smaller 
leg length for angle components, or ten times the smaller overall dimension for channels or T-sections.
4.6.3.3  Other simple ties
A simple tie consisting of a single angle connected through both legs by lug angles or otherwise, a single 
channel connected by both flanges or a T-section connected only through the stem (or both the flange and 
the stem), should be designed as axially loaded. The tension capacity should be based on the effective net 
area from 3.4.3.
4.6.3.4  Continuous ties
The internal bays of continuous ties should be designed as axially loaded. The tension capacity should be 
based on the effective net area from 3.4.3.
4.6.4  Laced or battened ties
For laced or battened ties, the lacing or battening systems should be designed to resist the greater of:
a) the axial forces, moments and shear forces induced by eccentric loads, applied moments or transverse 
forces, including self-weight and wind resistance;
b) the axial forces, moments and shear forces induced by a transverse shear on the complete member at 
any point in its length equal to 1 % of the axial force in the member, taken as shared equally between all 
transverse lacing or battening systems in parallel planes.
4.7  Compression members
4.7.1  General
4.7.1.1  Segment length
The segment length L of a compression member in any plane should be taken as the length between the 
points at which it is restrained against buckling in that plane.
4.7.1.2  Restraints
A restraint should have sufficient strength and stiffness to inhibit movement of the restrained point in 
position or direction as appropriate. Positional restraints should be connected to an appropriate shear 
diaphragm or system of triangulated bracing.
Positional restraints to compression members forming the flanges of lattice girders should satisfy the 
recommendations for lateral restraint of beams specified in 4.3.2. All other positional restraints to 
compression members should be capable of resisting a force of not less than 1.0 % of the axial force in the 
member and transferring it to the adjacent points of positional restraint.
Ag
is the gross cross-sectional area, see 3.4.1;
a1
is the gross area of the connected element, taken as the product of its thickness and the overall 
leg width for an angle, the overall depth for a channel or the flange width for a T-section.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Section 6 — Connections


BS 5950-1:2000
© BSI 05-2001
119
Section 5
5.3.4  Member or segment with one flange restrained
The following approach may be used for a member or segment that has a laterally unrestrained 
compression flange, provided that the other flange has intermediate lateral restraint at intervals such that 
the following conditions are satisfied:
a) adjacent to plastic hinge locations, the spacing of the intermediate lateral restraints should not exceed 
the value of Lm determined from 5.3.3;
b) elsewhere 4.8.3.3 or I.1 should be satisfied for out-of-plane buckling when checked using an effective 
length LE equal to the spacing of the intermediate lateral restraints, except that this spacing need not 
be less than Lm determined from 5.3.3.
Where these conditions are satisfied, the spacing of restraints to the compression flange should be such 
that:
— adjacent to plastic hinge locations the out-of-plane buckling resistance satisfies G.3.3;
— elsewhere G.2 is satisfied for out-of-plane buckling.
As an alternative to satisfying G.3.3 and G.2, the simple method given below may be used, provided that:
— conditions a) and b) given above are satisfied;
— the member is an I-section with D/B 1.2, where D is the depth and B is the flange width;
— for haunched segments Dh is not greater than 2Ds, see Figure 17;
— for haunched segments, the haunch flange is not smaller than the member flange;
— the steel is grade S 275 or grade S 355.
In the simple method, the spacing Ly between restraints to the compression flange should not exceed the 
limiting spacing Ls given conservatively by the following:
— for steel grade S 275:
— for steel grade S 355:
where  is the end moment ratio, using the same sign convention as in Table 18.
The limiting value u should be determined from the following:
— for steel grade S 275:
— for steel grade S 355:
The coefficients Ko and K should be obtained as follows:
Ko = (180 + x)/300
— for  20  x 30:
K = 2.3 + 0.03x – xfc /3 000
— for  30  x 50:
K = 0.8 + 0.08x – (x – 10) fc /2 000
in which fc and x are as defined in a).
NOTE   This approximation is based on the method given in reference [9], see Bibliography.
u
0.44
x
270
---------  
fc
200
---------
–
+
=
u
0.47
x
270
---------
fc
250
---------
–
+
=
Ls
620ry
K1 72
100 x


	2
–


0.5
--------------------------------------------------------
=
Ls
645ry
K1 94
100 x


	2
–


0.5
--------------------------------------------------------
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
120
© BSI 05-2001
Section 5
where
and K1 has the following values, see Figure 17:
— for an un-haunched segment: K1  = 1.00;
— for a haunch with Dh/Ds = 1: K1  = 1.25;
— for a haunch with Dh/Ds = 2: K1  = 1.40;
— for a haunch generally: 
K1  = 1 + 0.25(Dh/Ds)2/3.
5.3.5  Haunches
5.3.5.1  Three-flange haunches
Where a plastic hinge location occurs immediately adjacent to one end of a three-flange haunch (see G.1.2), 
the tapered segment need not be treated as a segment adjacent to a plastic hinge location if both of the 
following criteria are satisfied:
— both flanges have lateral restraint in accordance with 5.3.2 at the plastic hinge location itself or within 
a distance D/2 along the length of the tapered segment only, not the uniform segment;
— the depth of the haunch is sufficient for the tapered segment to remain elastic throughout its length.
5.3.5.2  Two-flange haunches
Where a plastic hinge location occurs immediately adjacent to one end of a two-flange haunch (see G.1.2), 
the tapered segment should satisfy one of the following criteria:
— the moment at the adjacent lateral restraint does not exceed 85 % of the reduced plastic moment        
capacity, reduced to allow for axial load;
— the length Ly to the adjacent lateral restraint to the compression flange does not exceed 85 % of the 
limiting length Lm from 5.3.3 or Ls from 5.3.4 or G.3 for a segment with one flange restrained.
5.4  Continuous beams
5.4.1  Elastic design
If elastic global analysis is used for a continuous beam, the moment capacity of the cross-section and the 
buckling resistance moment of the beam should be obtained using 4.2 and 4.3 or, in appropriate cases, G.2.
5.4.2  Plastic design
Plastic global analysis may be used for a continuous beam, provided that the conditions given in 5.2.3 are 
satisfied. In addition, the out-of-plane stability of the beam should satisfy 5.3, taking r as 1.0.
ry
is the minor axis radius of gyration of the un-haunched rafter;
x
is the torsional index, see 4.3.6.8, of the un-haunched rafter;
Figure 17 — Dimensions of a haunch
Lh
Ds
Dh
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
121
Section 5
5.5  Portal frames
5.5.1  General
Either elastic or plastic analysis, see 5.2, may be used for single-storey frames with rigid moment-resisting 
joints. All load combinations should be covered, including both uniform and non-uniform imposed roof 
loads. Notional horizontal forces should be applied when checking load combination 1 (gravity loads, 
see 2.4.1.2). In addition, the frame should be stabilized against sway out-of-plane, see 2.4.2.5.
Other frames with sloping members and moment-resisting joints may also be treated like portal frames.
5.5.2  Elastic design
If elastic global analysis is used for a portal frame, the cross-section capacity should be checked using 4.8.1 
and 4.8.3.2 and the out-of-plane buckling resistance should be checked using 4.8.3.3 or I.1, or in 
appropriate cases, G.2.
For independently braced frames, see 5.1.4, the in-plane member buckling resistances should also be 
checked using 4.8.3.3, with in-plane effective lengths obtained using E.4.2.
In all other cases, the in-plane stability of the frame should be verified by checking the cross-section 
capacity and out-of-plane buckling resistance of the members using amplified moments and forces, taken 
as the values given by linear elastic analysis multiplied by the required load factor r from 5.5.4.
5.5.3  Plastic design
Plastic global analysis may be used for a portal frame provided that the conditions given in 5.2.3 are 
satisfied. Multi-bay frames should also be checked for localized failure mechanisms.
The in-plane stability of the frame should be verified by checking that the plastic load factor p satisfies:
p  r
where r is the required load factor from 5.5.4 for the relevant load combination.
The out-of-plane stability of the members should be checked as detailed in 5.5.5.
5.5.4  In-plane stability
5.5.4.1  General
The in-plane stability of a portal frame should be checked under each load combination. Except for a tied 
portal, one of the following should be used:
a) the sway-check method given in 5.5.4.2, together with the snap-through check given in 5.5.4.3;
b) the amplified moments method given in 5.5.4.4;
c) second order analysis, see 5.5.4.5.
A tied portal should be checked as recommended in 5.5.4.6.
5.5.4.2  Sway-check method
5.5.4.2.1  General
The sway-check method may be used to verify the in-plane stability of portal frames in which each bay 
satisfies the following conditions:
a) the span L does not exceed 5 times the mean height h of the columns;
b) the height hr of the apex above the tops of the columns does not exceed 0.25 times the span L;
c) if the rafter is asymmetric hr satisfies the criterion:
in which sa and sb are the horizontal distances from the apex to the columns, see Figure 18a).
Provided that these conditions are met, linear elastic analysis should be used to calculate the notional 
horizontal deflections at the top of each column due to a set of notional horizontal forces applied in the same 
direction to each column and equal to 0.5 % of the vertical reaction at the base of the respective column for 
the relevant load case.
hr/sa

	2
hr/sb

	2
0.5

+
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
122
© BSI 05-2001
Section 5
Generally, these notional horizontal forces should be applied at the tops of the respective columns. 
However, in the case of columns supporting loads from crane gantries, or other significant vertical loads 
applied within their height, the notional horizontal forces derived from such loads should be applied to the 
column at the same level as the relevant vertical load.
5.5.4.2.2  Gravity loads
For gravity loads (load combination 1, see 2.4.1.2), the notional horizontal deflections should be determined 
without any allowance for the stiffening effects of cladding. If the notional horizontal deflections 	i at the 
tops of the columns do not exceed hi/1 000, where hi is the height of that column, then for gravity loads the 
required load factor r for frame stability should be taken as 1.0.
Provided that the frame is not subject to loads from valley beams or crane gantries or other concentrated 
loads larger than those from purlins, the hi/1 000 sway criterion for gravity loads may be assumed to be 
satisfied if in each bay:
in which
a) Dimensions
b) Arching ratio
Figure 18 — Portal frame definitions
Lb =

=
 
for a single bay frame;

=
 
for a multi-bay frame;
and  is the arching ratio, given by:

= Wr/Wo
h   
r
s a
s b
r
L
h 
h 1
h   
r
h 2
r
W
L
Wo
L
Lb
D
------
44L
h
----------

4

Lr/L
+
-------------------------



 275
pyr
---------





L
2Dh
Ds
Dh
+
--------------------






Lh
–
2Ic
Ir
-------





 L
h---
 
 
 
Ic
Ir
----





 L
h---
 
 
 
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
123
Section 5
If the two columns or the two rafters of a bay differ, the mean value of Ic/Ir should be used.
If the haunches at each side of the bay are different, the mean value of Lb should be used.
5.5.4.2.3  Horizontal loads
For load combinations that include wind loads or other significant horizontal loads, allowance may be made 
for the stiffening effects of cladding in calculating the notional horizontal deflections 	i, see 5.5.4.2.1.
Provided that the hi/1 000 sway criterion is satisfied for gravity loads, then for load cases involving            
horizontal loads the required load factor r for frame stability should be determined using:
in which sc is the smallest value, considering every column, determined from:
using the notional horizontal deflections 	i for the relevant load case.
If  sc < 5.0 second order analysis should be used.
Provided that the frame is not subject to loads from valley beams or crane gantries or other concentrated 
loads larger than those from purlins, then sc may be approximated using:
If the wind loads are such that the axial forces are tensile in all rafters and columns, then the required load 
factor r should be taken as 1.0.
5.5.4.3  Snap-through
In each internal bay of a single-storey frame with three or more bays the rafter should satisfy the following:
If the arching ratio  is less than one, no limit need be placed on Lb/D.
For a symmetrical ridged bay  should be taken as the slope of the rafters. For other roof shapes the value 
of  should be determined from:
  = tan–1(2hr/L)
where
D
is the cross-section depth of the rafter;
Dh is the additional depth of the haunch, see Figure 17;
Ds is the depth of the rafter, allowing for its slope, see Figure 17;
h
is the mean column height;
Ic
is the in-plane second moment of area of the column (taken as zero if the column is not rigidly 
connected to the rafter, or if the rafter is supported on a valley beam);
Ir
is the in-plane second moment of area of the rafter;
L
is the span of the bay;
Lb is the effective span of the bay;
Lh is the length of a haunch, see Figure 17;
Lr is the total developed length of the rafters, see Figure 18a);
pyr is the design strength of the rafters in N/mm2;
Wo is the value of Wr for plastic failure of the rafters as a fixed-ended beam of span L;
Wr is the total factored vertical load on the rafters of the bay, see Figure 18b).
r
sc
sc
1
–
----------------
=
sc
hi
200	i
--------------
=
sc
220DL
hLb
------------------

4

Lr/L
+
-------------------------



 275
pyr
---------




=
Lb
D
------
22 4
L/h
+

	
4 
1
–

	
------------------------------- 1
Ic
Ir 
-----
+



 275
pyr
---------




2
tan

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
124
© BSI 05-2001
Section 5
5.5.4.4  Amplified moments method
For each load case the in-plane stability of a portal frame may be checked using the lowest elastic critical 
load factor cr for that load case. This should be determined taking account of the effects of all the members 
on the in-plane elastic stability of the frame as a whole.
NOTE   Information on determining cr for a portal frame is given in reference [10], see Bibliography.
In this method, the required load factor r for frame stability should be determined from the following:
If cr < 4.6 the amplified moments method should not be used.
5.5.4.5  Second-order analysis
The in-plane stability of a portal frame may be checked using either elastic or elastic-plastic second order 
analysis. When these methods are used the required load factor r for frame stability should be taken 
as 1.0.
NOTE   Guidance on an appropriate method is given in reference [10], see Bibliography.
5.5.4.6  Tied portals
The in-plane stability of a tied portal should be checked using elastic or elastic-plastic second order 
analysis. The required load factor r for frame stability should be taken as 1.0.
NOTE   Guidance on an appropriate method is given in reference [10], see Bibliography.
The method used should allow for the increase in the tie force due to the reduction in the lever arm from 
the apex to the tie, caused by extension of the tie and deformation of the rafter, unless the tie is supported 
by a hanger designed to avoid reducing this lever arm. To make allowance for the effects of plasticity when 
elastic-plastic analysis is used, in the absence of a more exact analysis the total reduction of the lever arm 
may be taken as twice that predicted by linear elastic analysis.
5.5.5  Out-of-plane stability
The out-of-plane stability of all frame members should be ensured under all load cases, not just the critical 
load case for the plastic resistance of the frame members. Where differential settlement of foundations is 
a design criterion, this should be taken into account in checking out-of-plane stability.
Lateral restraints should be provided in accordance with 5.3. The restraints or virtual restraints to the 
bottom flange of the rafter shown in Figure 19 should extend up to or beyond the point of contraflexure.
If the purlins and their connections to the rafter are capable of providing torsional restraint to the top 
flange of the rafter, an allowance for this torsional restraint may be made by assuming a virtual lateral 
restraint to the bottom flange at the point of contraflexure, whether or not the top flange is restrained at 
this point.
This virtual restraint should not be assumed if another form of allowance is made for the torsional restraint 
of the top flange by the purlins.
Torsional restraint of the top flange by the purlins may be assumed if the following criteria are all satisfied.
a) The rafter is an I-section with D/B  1.2, where D is the depth and B is the flange width.
b) For haunched rafters Dh is not greater than 2Ds, see Figure 17.
c) Every length of purlin has at least two bolts in each purlin-to-rafter connection.
d) The depth of the purlin section is not less than 0.25 times the depth D of the rafter.
Lateral restraint of the bottom flange should not be assumed at the point of contraflexure under other 
restraint conditions, unless a lateral restraint is actually provided at that point.
— if cr  10:
— if 10 > cr  4.6:
r
1.0
=
r
0.9cr
cr
1
–
----------------
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
125
Section 5
5.6  Elastic design of multi-storey rigid frames
5.6.1  General
If elastic global analysis is used for a multi-storey frame with rigid moment-resisting joints, the               
cross-section capacity should be checked using 4.8.1 and 4.8.3.2 and the buckling resistance should be 
checked using 4.8.3.3 or I.1 or, in appropriate cases, G.2.
The load cases to be checked and the in-plane effective lengths to be taken for the columns should be 
determined from 5.6.2, 5.6.3 or 5.6.4 as relevant.
5.6.2  Independently braced frames
Independently braced frames, see 5.1.4, should be designed to resist gravity loads (load combination 1, 
see 2.4.1.2). The non-sway mode in-plane effective lengths of the columns should be used, see Annex E.
The maximum moments in the beams and the combinations of axial force and moments in the columns that 
give the worst cases for cross-section capacity (see 4.8.3.2) and for member buckling resistance 
(see 4.8.3.3), should be determined by applying both full and pattern loading of imposed load.
In order to reduce the number of load cases, suitable sub-frames may be used for pattern loading.
NOTE   Information on sub-frames is given in reference [11], see Bibliography.
5.6.3  Non-sway frames
Non-sway frames, see 2.4.2.6, should be designed to resist gravity loads (load combination 1, see 2.4.1.2), 
as for independently braced frames, see 5.6.2. They should also be checked for combined vertical and 
horizontal loads (load combinations 2 and 3, see  2.4.1.2) without pattern loading. The non-sway mode 
in-plane effective lengths of the columns should be used, see Annex E.
5.6.4  Sway-sensitive frames
Sway-sensitive frames, see 2.4.2.7, should initially be designed to resist gravity loads (load combination 1, 
see 2.4.1.2), as for independently braced frames, see 5.6.2, without taking account of sway.
Sway-sensitive frames should then be checked in the sway mode by applying the notional horizontal forces, 
see 2.4.2.4, together with the full gravity load (load combination 1, see 2.4.1.2) without any pattern 
loading. They should also be checked in the sway mode for combined vertical and horizontal loads (load 
combinations 2 and 3, see 2.4.1.2) without pattern loading.
Figure 19 — Haunch restraints
*
*
*
*
*
*
*
*
_
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
Key:
* 
Restraint
X Restraint or virtual restraint
< Ls
_< Ls
_< Ls
_< Ls
_< Ls
X
X
X
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
126
© BSI 05-2001
Section 5
Provided that cr  4.0 sway should be allowed for by using one of the following methods.
a) Effective length method: In this method, sway mode in-plane effective lengths, see Annex E, should be 
used for the columns. The beams should be designed to remain elastic under the factored loads.
b) Amplified sway method: The sway moments, see 2.4.2.8, should be multiplied by the amplification 
factor kamp from 2.4.2.7 and the internal forces adjusted to maintain equilibrium with the applied loads. 
In this method, non-sway mode in-plane effective lengths, see Annex E, should be used for the columns.
If cr is less than 4.0, second order elastic analysis should be used to allow for sway.
5.7  Plastic design of multi-storey rigid frames
5.7.1  General
If plastic global analysis is used for a multi-storey frame with rigid moment-resisting joints, the conditions 
for plastic analysis given in 5.2.3 should be satisfied. In addition, the frame should be stabilized against 
sway out-of-plane, see 2.4.2.5.
Members should be checked for the forces and moments determined as given in 5.7.2 or 5.7.3 as relevant. 
The cross-section capacity should be determined using 4.8.1 and 4.8.3.2. Out-of-plane buckling of members 
containing plastic hinges should be prevented by providing restraints as recommended in 5.3. Out-of-plane 
buckling of other members should be checked as detailed in 4.8.3.3 or I.1 or, in appropriate cases, G.2. The 
resistance of the columns to in-plane buckling should be checked as given in 5.7.2 or 5.7.3, as appropriate.
5.7.2  Independently braced frames
Independently braced frames, see 5.1.4, should be designed to resist gravity loads (load combination 1, 
see 2.4.1.2). In checking the columns for resistance to in-plane member buckling, the effective length LE in 
the plane of the frame should generally be taken as equal to the storey height L. However, if some of the 
beams in that plane have been designed to remain elastic, the in-plane effective length LE for the non-sway 
mode may be determined from Annex E.
Columns should also be checked under the combination of axial force and moments that gives the worst 
case for member buckling, determined by applying pattern loading to the imposed load. In this check the 
in-plane effective length for the non-sway mode should be determined from Annex E. An appropriate       
sub-frame may be used to take account of pattern loading.
NOTE   Information on this application of sub-frames is given in reference [12], see Bibliography.
5.7.3  Unbraced frames
5.7.3.1  General
Except for frames that satisfy the frame stability check given in 5.7.3.2, all plastically designed 
multi-storey frames that are not independently braced against sway should be designed to resist sway 
mode failure using either elastic analysis (see 5.6) or second order elastic-plastic analysis (see 5.2.1).
Multi-storey frames that are not independently braced should also be checked for possible non-sway modes 
of failure as recommended for independently braced frames in 5.7.2.
5.7.3.2  Frame stability check
The use of this simplified check for frame stability should be limited to frames that also satisfy the following 
conditions.
a) The bases of the columns should be fixed (but see also 5.1.3).
b) The plastic hinge mechanism should be a sway mode, with plastic hinges assumed in all the beams 
and at the base of each column, but no other hinges in the columns.
c) It should be ensured that no localized beam or storey-height plastic hinge mechanisms can form at a 
lower load factor than the overall frame mechanism.
d) The storey height of the frame should nowhere exceed the mean spacing of its columns in that storey.
e) The lower lengths of the columns should be designed to remain elastic under the theoretical plastic 
hinge moments at the bases assumed in a).
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
127
Section 5
The elastic critical load factor cr should be determined from F.2, taking into account the base stiffness, 
determined as detailed in 5.1.3.
The plastic load factor p should not be less than the required load factor r for frame stability given by the 
following:
a) for clad structures, provided that the stiffening effect of masonry infill wall panels or diaphragms of 
profiled steel sheeting (see 2.4.2.5) is not taken into account:
b) for unclad frames, or for clad structures in which the stiffening effect of masonry infill wall panels or 
diaphragms of profiled steel sheeting (see 2.4.2.5) is taken into account:
If cr is less than 4.6 for case a) or 5.75 for case b), either elastic analysis or second order elastic-plastic 
analysis (see 5.2.1) should be used.
— if cr 10:
— if 10 > cr 4.6:
— if cr 20:
— if 20 > cr 5.75:
r
1.0
=
r
0.9cr
cr
1
–
----------------
=
r
1.0
=
r
0.9cr
cr
1
–
----------------
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

128
blank
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
129
Section 6.  Connections
6
6.1  General recommendations
6.1.1  General
Joints should be designed on the basis of realistic assumptions of the distribution of internal forces. These 
assumptions should correspond with direct load paths through the joint, taking account of the relative 
stiffnesses of the various components of the joint. In all cases, equilibrium should be maintained between 
the internal forces and the external applied loads.
Where other members are connected to the surface of a web or flange of a member, the ability of the web 
or flange to transfer the applied forces should be checked.
Ease of fabrication and erection should also be taken into account in the design of connections and splices. 
Attention should be paid to clearances necessary for tightening bolts (particularly for preloaded bolts), 
welding procedures, subsequent inspection, surface treatment and maintenance.
Because the ductility of structural steel assists the distribution of forces generated within a joint, residual 
stresses and stresses due to tightening of bolts and imperfect fit-up need not normally be calculated.
As non-preloaded bolts in clearance holes generally slip before starting to transfer load in shear, they 
should not be assumed to share load with welds or preloaded bolts and one form of connection should 
normally be designed to carry the total load. However, preloaded bolts designed to be non-slip under 
factored loads may be designed to share load with welds, provided that the final tightening is done after 
welding.
6.1.2  Detailing
The connections between members should be capable of withstanding the forces and moments to which 
they are subjected, within acceptable deformation limits and without invalidating the design assumptions.
The detailing of connections should take account of possible dimensional variations due to rolling margins 
and fabrication variations, leading to some degree of lack of fit.
6.1.3  Intersections
Where there is eccentricity at intersections, the members and connections should be designed to 
accommodate the resulting moments, forces, deflections and rotations. In the case of bolted framing 
consisting of angles and T-sections, the intersections of the setting-out lines of the bolts may be adopted 
instead of the intersections of the centroidal axes.
In joints involving structural hollow sections, limited eccentricity between member intersections should be 
introduced where necessary to suit other features of connection design, see 6.7.3.3.
6.1.4  Joints in simple design
In simple design, joints between members should be capable of transmitting the calculated forces and 
should also be capable of accepting the resulting rotation, see 2.1.2.2. They should not develop significant 
moments that adversely affect members of the structure.
6.1.5  Joints in continuous design
In continuous design, joints between members should be capable of transmitting the forces and moments 
calculated in the global analysis. In the case of elastic analysis, the rigidity of the joints should be such that 
the stiffness of the frame is not less than that assumed in the analysis to an extent that would reduce its 
load carrying capacity. In the case of plastic analysis, a joint at a plastic hinge location should have a 
moment capacity at least equal to that of the member, and should also have sufficient plastic rotation 
capacity.
The fabrication restrictions given in 5.2.3.4 should also be applied where local yield lines are assumed in 
the design of components of moment-resisting connections. This applies irrespective of whether elastic or 
plastic global analysis is used for the structure.
6.1.6  Joints in semi-continuous design
In semi-continuous design, joints should provide a predictable degree of interaction between members as 
described in 2.1.2.4. They should be capable of transmitting the in-plane restraint moments in addition to 
the other forces and moments at the joints. It should be ensured that the joints are neither too rigid nor too 
flexible to fulfil accurately the assumptions made in design.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
130
© BSI 05-2001
Section 6
6.1.7  Connections subject to vibration, load reversal or fatigue
6.1.7.1  Vibration
In connections subject to impact or vibration, preloaded bolts, locking devices or welds should be used.
6.1.7.2  Load reversal
In connections transferring load in shear, that are subject to load reversal (unless the reversal is due solely 
to wind) or in which slipping of bolts is unacceptable for some other reason, fitted bolts, preloaded bolts or 
welding should be used.
6.1.7.3  Fatigue
If fatigue is a design criterion, see 2.4.3, the fabrication restrictions given in 5.2.3.4 should be applied.
6.1.8  Splices
6.1.8.1  General
Splices should be designed to hold the connected members in place. Wherever practicable, the members 
should be arranged so that the centroidal axis of the splice coincides with the centroidal axes of the 
members joined. If eccentricity occurs, the resulting moments, forces, deflections and rotations should be 
allowed for.
6.1.8.2  Splices in compression members
If the splice is not intended to transmit compression by direct contact of cross-sections in bearing, it should 
be designed to transmit all the moments and forces in the member at that point.
If the splice is intended to transmit compression by direct contact of cross-sections in bearing, it should be 
designed to resist any moments in the member at that point and to maintain the intended member stiffness 
about each axis.
Splices should be as close as practicable to the points of inflexion of their buckled shape. Where this is not 
achieved their capacity should be increased to take account of the moments induced by strut action, 
see C.3, and of the additional moments due to moment amplification, see I.5. Allowance should be made 
for moments due to strut action about each axis, but only about one axis at a time.
6.1.8.3  Splices in tension members
The splice should be designed to transmit all the moments and forces to which the member is subjected at 
that point.
6.1.8.4  Splices in beams
Beam splices should be designed to transmit all the forces and moments in the member at that point and 
to maintain the required member stiffness about both axes.
Splices in laterally unrestrained beams should be as close as practicable to the points of inflexion of their 
buckled shape. Where this is not achieved, their capacity should be increased to take account of the 
additional internal moment, see B.3, and of the additional moments due to moment amplification, see I.5.
6.1.9  Column web panel zone
In a moment-resisting joint between a beam and a column (or a rafter and a column) the web of the column 
within the depth of the beam should be treated as a web panel zone, irrespective of whether the column 
web is stiffened or unstiffened, see Figure 20. In the column web panel zone the local shear force Fvp due 
to moment transfer should be taken into account.
In a welded joint with a single beam, the panel zone shear Fvp should be obtained from:
Fvp = Mtra/(Db  Tb)
where
Db
is the beam depth;
Mtra
is the moment transferred from the beam to the column at the joint;
Tb
is the beam flange thickness.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
131
Section 6
In a bolted end-plate joint with a single beam, the panel zone shear Fvp should be obtained from the sum 
of the bolt forces due to the moment Mtra transferred from the beam to the column, taking each bolt force 
as the tension it transfers from the end-plate to the column.
In a joint with two beams connected on opposite sides, the panel zone shear Fvp should be determined 
taking account of the net effect of the moments in both beams.
At a bolted joint, the shear capacity Pv given in 4.2 may be developed in the column web panel zone. No 
reduction in moment capacity need be made in the members connected by the joint to allow for the effect 
of shear within the web panel zone.
At a welded joint, the moment capacities of the members connected by the joint need not be reduced to allow 
for the shear Fv in the web panel zone, provided that Fv/Pv  0.8. The full shear capacity Pv may be 
developed in the web panel zone, provided that the end moment in each member does not exceed its elastic 
moment capacity pyZx. Otherwise Fv should satisfy Fv/Pv  1   in which  is the sum of the values 
of  for each of the members connected at the joint, and  is given by:
If the web of the column is unstiffened, the web thickness should not be reduced below that needed within 
the web panel zone for distances above and below this zone equal to the column depth.
6.2  Connections using bolts
6.2.1  Bolt spacing
6.2.1.1  Minimum spacing
For standard clearance holes or holes for fitted bolts the spacing between centres of bolts should not be less 
than 2.5d, where d is the nominal diameter of the bolts. For oversize holes or slotted holes the hole spacing 
should be increased to leave at least the same width of steel clear between the holes as for standard 
clearance holes.
Figure 20 — Column web panel zone
where
M
is the end moment in that member;
Mel
is the elastic moment capacity pyZx of the member;
Mp
is the plastic moment capacity pySx of the member.

0.05
M
Mel
–

	
Mp
Mel
–

	
-----------------------------
=
but
0.05

0


Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
132
© BSI 05-2001
Section 6
6.2.1.2  Maximum spacing in unstiffened plates
Where a plate is not stiffened by a web or outstand, the spacing between centres of adjacent bolts in a line 
lying in the direction of stress should not exceed 14t, where t is the thickness of the thinner element. If it 
is exposed to corrosive influences, the maximum spacing of bolts in each of two directions at right angles 
should not exceed the lesser of 16t or 200 mm, where t is the thickness of the thinner outside ply.
6.2.2  Edge and end distances
6.2.2.1  General
For standard clearance holes, and for holes for fitted bolts, the edge distance should be taken as the 
distance from the centre of the hole to the adjacent edge, measured perpendicular to the direction of stress. 
The end distance should be taken as the distance from the centre of the hole to the adjacent edge, measured 
in the direction in which the bolt bears. The end distance should also be sufficient to provide adequate 
bearing capacity, see 6.3.3.3 and 6.4.4.
6.2.2.2  Slotted holes
For slotted holes, edge and end distances should be measured from the edge or end of the material to the 
centre of its end radius or to the centreline of the slot, see Figure 21.
6.2.2.3  Oversize holes
For oversize holes, the edge and end distances should be taken as the distance from the relevant edge, 
see 6.2.2.1, less half the nominal diameter of the oversize hole, plus half the diameter D of a standard 
clearance hole.
6.2.2.4  Minimum edge or end distance
The distance from the centre of a bolt hole to the edge or end of any part should be not less than the value 
given in Table 29.
6.2.2.5  Maximum edge or end distance
Where parts are connected by bolts, the distance from an unstiffened edge to the nearest line of bolts should 
not exceed 11t. This does not apply to bolts interconnecting the components of back-to-back tension 
members, see 4.6.3. Where the parts are exposed to corrosive influences, the edge distance should not 
exceed 40 mm + 4t.
Figure 21 — Minimum edge and end distances
e = end or edge distance
e = end or edge distance
e  
e
e
D  
D  
e  
e
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
133
Section 6
Table 29 — Minimum edge and end distances of bolts
6.2.3  Effect of bolt holes on shear capacity
Bolt holes need not be allowed for in the shear area provided that:
Av.net  0.85Av/Ke
If Av.net is less than 0.85Av/Ke the net shear capacity should be taken as 0.7pyKeAv.net.
6.2.4  Block shear
Block shear failure through a group of bolt holes at a free edge, see Figure 22, (consisting of failure in shear 
at the row of bolt holes along the shear face of the hole group, accompanied by tensile rupture along the 
line of bolt holes on the tension face of the hole group, see Figure 22) should be prevented by checking that 
the reaction Fr does not exceed the block shear capacity Pr determined from:
Pr = 0.6pyt[Lv + Ke(Lt – kDt)]
Quality of cut
Edge and end distances
For a rolled, machine flame cut, sawn or planed edge or end
1.25D
For a sheared or hand flame cut edge or end
1.40D
NOTE
D is the diameter of a standard clearance hole for a bolt of the relevant nominal diameter, see Table 33.
where
Av.net
is the net shear area after deducting bolt holes;
Ke
is the effective net area coefficient from 3.4.3.
where
Dt
is the hole size for the tension face, generally the hole diameter, but for slotted holes the 
dimension perpendicular to the direction of load transfer should be used;
k
is a coefficient with values as follows:
— for a single line of bolts: k = 0.5;
— for two lines of bolts: 
k = 2.5;
Lt
is the length of the tension face, see Figure 22;
Lv
is the length of the shear face, see Figure 22;
t
is the thickness.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
134
© BSI 05-2001
Section 6
6.3  Non-preloaded bolts
6.3.1  Effective areas of bolts
Bolts may have short, standard or long thread lengths, or have fully threaded shanks. The shear area As 
of a bolt should normally be taken as the tensile stress area  At as specified in the appropriate bolt standard. 
For bolts without a defined tensile stress area, At should be taken as the area at the bottom of the threads.
Where it can be shown that threads do not occur in the shear plane, As may be taken as the shank area A. 
In the calculation of thread length, allowance should be made for tolerances and the thread run off.
6.3.2  Shear capacity
6.3.2.1  General
Provided that no reduction is required for the effect of packing (see 6.3.2.2), large grips (see 6.3.2.3), 
kidney-shaped slots (see 6.3.2.4), or long joints (see 6.3.2.5), the shear capacity Ps of a bolt should be taken 
as:
Ps  =  psAs
Figure 22 — Block shear — Effective shear area
where
As is the shear area (A or At) as defined in 6.3.1;
ps
is the shear strength obtained from Table 30.
Lt
r
v
F
Lt
Lv
Lv
r
F
rF
v
L
L 
rF
Lt
Lt
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
135
Section 6
Table 30 — Shear strength of bolts
6.3.2.2  Packing
The total thickness of steel packing tpa at a shear plane should not exceed 4d/3, where d is the nominal 
diameter of the bolts. For multiple packs, the number of plies should preferably not exceed four.            
Where tpa exceeds d/3 the shear capacity Ps should be taken as:
but not more than given in 6.3.2.3 for large grip lengths or 6.3.2.5. for long joints.
6.3.2.3  Large grip lengths
Where the grip length Tg (i.e. the total thickness of the connected plies) exceeds 5d, where d is the nominal 
diameter of the bolts, the shear capacity Ps should be taken as:
but not more than given in 6.3.2.2 for the effect of packing or 6.3.2.5. for long joints.
6.3.2.4  Kidney-shaped slots
Where a connection has two bolts, one in a standard clearance hole and one in a kidney-shaped slot, 
see 6.3.3.3, the shear capacity of each bolt should be taken as 0.8Ps.
6.3.2.5  Long joints
Where the lap length Lj of a splice or connection transferring tension or compression with more than two 
rows of bolts (i.e. the distance between the first and last rows of bolts, measured in the direction of load 
transfer, see Figure 23) exceeds 500 mm, the shear capacity Ps should be taken as:
but not more than given in 6.3.2.2 for the effect of packing or 6.3.2.3 for large grip lengths.
Bolt grade
Shear strength ps (N/mm2)
4.6
160
8.8
375
10.9
400
General grade HSFG
M24
400
to BS 4395-1
M27
350
Higher grade HSFG to BS 4395-2
400
Other grades (Ub  1000 N/mm2)
0.4Ub 
Ub is the specified minimum tensile strength of the bolt.
Figure 23 — Lap length of a splice
Ps
psAs
9d
8d
3tpa
+
------------------------




=
Ps
psAs
8d
3d
Tg 
+
---------------------




=
Ps
psAs
5 500
Lj
–
5 000
---------------------------




=
L j
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
136
© BSI 05-2001
Section 6
6.3.3  Bearing capacity
6.3.3.1  General
The bearing capacity of a bolt on any connected part should be taken as the lesser of the bearing capacity 
Pbb of the bolt (see 6.3.3.2) and the bearing capacity Pbs of the part (see 6.3.3.3).
6.3.3.2  Bearing capacity of bolt
The bearing capacity of the bolt itself should be taken as:
Pbb = dtppbb
where
Table 31 — Bearing strength of bolts
6.3.3.3  Bearing capacity of connected part
The bearing capacity Pbs of the connected part should be taken as follows:
where
Table 32 — Bearing strength pbs of connected parts
Provided that the sizes of the holes for non-preloaded bolts do not exceed the standard dimensions given in 
Table 33, the coefficient kbs allowing for the type of hole should be taken as follows:
d
is the nominal diameter of the bolt;
pbb is the bearing strength of the bolt, obtained from Table 31;
tp
is the thickness of the connected part, or, if the bolts are countersunk, the thickness of the part 
minus half the depth of countersinking.
Bolt grade
Bearing strength pbb (N/mm2)
4.6
460
8.8
1000
10.9
1300
General grade HSFG
M24
1000
to BS 4395-1
M27
900
Higher grade HSFG to BS 4395-2
1300
Other grades (Ub  1000 N/mm2)
0.7(Ub + Yb)
NOTE 1
Ub is the specified minimum tensile strength of the bolt.
NOTE 2
Yb  is the specified minimum yield strength of the bolt.
e
is the end distance, as defined in 6.2.2.1;
pbs is the bearing strength of the connected part, see Table 32.
Steel grade
S 275
S 355
S 460
Other grades
Bearing strength pbs (N/mm2)
460
550
670
0.67(US + YS)
NOTE 1
Us  is the specified minimum tensile strength of the steel.
NOTE 2
Ys  is the specified minimum yield strength of the steel.
— for bolts in standard clearance holes: kbs  =  1.0
— for bolts in oversized holes:
kbs  =  0.7
— for bolts in short slotted holes:
kbs  =  0.7
— for bolts in long slotted holes:
kbs  =  0.5
— for bolts in kidney-shaped slots:
kbs  =  0.5
Pbs
kbsdtppbs
=
but
Pbs
0.5kbsetppbs

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
137
Section 6
Table 33 — Standard dimensions of holes for non-preloaded bolts
6.3.4  Bolts subject to tension
6.3.4.1 General
The tension capacity of a connection using bolts (including 90º countersunk head bolts) should be checked 
using one of the following methods:
— the simple method given in 6.3.4.2;
— the more exact method given in 6.3.4.3.
6.3.4.2  Simple method
The simple method may be used if the connection satisfies both of the following:
— the cross-centre spacing of the bolt lines should not exceed 55 % of the flange width or end-plate width, 
see Figure 24;
— if a connected part is designed assuming double curvature bending, see Figure 25b), its moment 
capacity per unit width should be taken as pytp2/6, where tp is the thickness of the connected part.
In the simple method the prying force need not be calculated. The tensile force per bolt Ft transmitted by 
the connection should not exceed the nominal tension capacity Pnom of the bolt, obtained from:
Pnom  =  0.8ptAt
where
Nominal 
diameter of 
bolt
Standard 
clearance 
hole
Oversize holea
Short slotted hole
Long slotted holeb
Kidney-shaped slot
Diameter
Diameter
Width
Length
Width
Length
Width
Length
mm
mm
mm
mm
mm
mm
mm
mm
mm
12
13
16
13
16
13
42
13
36
16
18
20
18
22
18
56
18
48
20
22
25
22
26
22
70
22
60
22
24
27
24
28
24
77
24
66
24
26
30
26
32
26
84
26
72
27
d + 3
d + 8
d + 3
d + 10
d + 3
3.5d
d + 3
3.0d
NOTE
d is the nominal diameter of the bolt (in mm).
a Larger diameter holes may be used for holding-down bolts.
b Longer slots may be used for expansion joints.
At is the tensile stress area as specified in the appropriate bolt standard. For bolts where the tensile 
stress area is not defined, At should be taken as the area at the bottom of the threads;
pt is the tension strength of the bolt obtained from Table 34.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
138
© BSI 05-2001
Section 6
Table 34 — Tension strength of bolts
6.3.4.3   More exact method
The more exact method may be used for a connection in which both of the connected parts satisfy one or 
more of the following:
a) the connected part spans between two or more supporting parts;
b) the outstand of the connected part is designed assuming single curvature bending, see Figure 25a);
c) the outstand of the connected part is designed assuming double curvature bending, see Figure 25b), 
and the resulting prying force Q is calculated and included in the total applied tension Ftot in the bolt;
d) the connected part spans between two or more supporting parts in one direction, but acts as an 
outstand in the other direction, and the resulting prying force Q is calculated and included in the total         
applied tension Ftot in the bolt.
NOTE
In cases a) and b) no prying force is necessary for equilibrium.
In the more exact method the moment capacity per unit width of the connected part should be taken as 
pytp2/4 and the total applied tension Ftot in the bolt, including the calculated prying force, should not exceed 
the tension capacity Pt obtained from:
Pt  =  pt At
Figure 24 — Maximum cross-centres of bolt lines for the simple method
Bolt grade
Tension strength pt (N/mm2)
4.6
240
8.8
560
10.9
700
General grade HSFG
M24
590
to BS 4395-1
M27
515
Higher grade HSFG to BS 4395-2
700
Other grades (Ub  1000 N/mm2)
0.7Ub but  Yb
NOTE 1
Ub is the specified minimum tensile strength of the bolt.
NOTE 2
Yb  is the specified minimum yield strength of the bolt.
s
B
s < 0,55B
_
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
139
Section 6
6.3.4.4  Combined shear and tension
Bolts that are subject to shear Fs as well as tension should, in addition to the conditions given in 6.3.1 
to 6.3.4.3, satisfy the following:
where
6.4  Preloaded bolts
6.4.1  General
Depending on the reason for adopting preloading, a connection using preloaded HSFG bolts should be 
designed as one of the following:
a) a normal “bearing type” connection;
b) non-slip in service;
c) non-slip under factored loads.
In case a) the preloaded bolts should be designed in the same way as non-preloaded bolts, see 6.3.
For cases b) and c) the slip resistance should be checked as recommended in 6.4.2 and 6.4.5.
In case b) the shear capacity and bearing capacity after slipping should also be checked, see 6.4.4.
NOTE   The resistance of a friction grip connection to slip in service is a serviceability criterion, but for ease of use it is presented in 
a modified form, suitable for checking under factored loads.
a) Single curvature bending                         
b) Double curvature bending
Figure 25 — Design of outstands
— for the simple method:
— for the more exact method:
Ps
is the shear capacity, see 6.3.2.
2Ft
M
M
Q
Q
tF  + Q
tF  + Q
M2
1
1
M2
Ft
2Ft
Ft
M
M
1
1
Fs
Ps
-----
Ft
Pnom
-------------
1.4

+
Fs
Ps
-----
Ftot
Pt
---------
1.4

+
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
140
© BSI 05-2001
Section 6
6.4.2  Slip resistance
The slip resistance PsL of a preloaded bolt should be determined as follows:
— for connections designed to be non-slip in service:
PsL  =  1.1KsPo
— for connections designed to be non-slip under factored loads:
PsL  =  0.9 KsPo
where
The coefficient Ks allowing for the type of hole should be taken as follows:
Connections with preloaded bolts in long slotted holes, loaded parallel to the slot, should always be 
designed to be case c) non-slip under factored loads, i.e. using PsL = 0.9KsPo not 1.1 KsPo.
If waisted-shank HSFG bolts are used, the connection should always be designed to be case c) non-slip 
under factored loads, i.e. using PsL = 0.9KsPo not 1.1KsPo.
6.4.3  Slip factor
The slip factor  should be obtained from Table 35. Alternatively, it may be determined from the results of 
tests as specified in BS 4604.
Table 35 — Slip factors for preloaded bolts
6.4.4  Capacity after slipping
For friction grip connections designed to be non-slip in service, case b) of 6.4.1, the slip resistance PsL 
should not be taken as more than the shear capacity Ps determined from 6.3.2, nor more than the friction 
grip bearing capacity Pbg given by:
where pbs is the bearing strength of connected parts from Table 32 and d, e and tp are as given in 6.3.3.
NOTE   This bearing capacity applies only to preloaded bolts designed to be non-slip in service, case b) of  6.4.1. For the bearing 
capacity of preloaded bolts in bearing type connections see 6.3.3.
Po is the minimum shank tension as specified in BS 4604;

is the slip factor.
— for preloaded bolts in standard clearance holes:
Ks  =  1.0;
— for preloaded bolts in oversized holes or short slotted holes:
Ks  =  0.85;
— for preloaded bolts in long slotted holes, loaded perpendicular to the slot:
Ks  = 0.85;
— for preloaded bolts in long slotted holes, loaded parallel to the slot:
Ks  =  0.7.
Class
Condition of faying surfaces
Slip factor

Preparation
Treatment
A
Blasted with shot or grit
Loose rust removed, no pitting
0.5
Spray metallized with aluminium
Spray metallized with a zinc based coating that has 
been demonstrated to provide a slip factor of at 
least 0.5
B
Blasted with shot or grit
Spray metallized with zinc
0.4
C
Wire brushed
Loose rust removed, tight mill scale
0.3
Flame cleaned
D
Untreated
Untreated
0.2
Galvanized
Pbg
1.5dtppbs
=
but
Pbg
0.5etppbs

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
141
Section 6
6.4.5  Combined shear and tension
Preloaded bolts in friction grip connections that are also subject to externally applied tension should 
satisfy:
where
Preloaded bolts in bearing type connections should be designed in the same way as non-preloaded bolts, 
see 6.3.
6.4.6  Holes for preloaded bolts
6.4.6.1  Sizes of holes
Sizes of holes for preloaded bolts should not exceed the standard dimensions given in Table 36. Standard 
clearance holes should be used unless oversize or slotted holes are required.
6.4.6.2  Oversize and short slotted holes
Oversize and short slotted holes may be used in all plies of a friction grip connection, provided that 
standard hardened washers are placed over the holes in the outer plies.
6.4.6.3  Long slotted holes
Long slotted holes should not be used in more than one of the connected plies at any individual faying 
surface of a friction grip connection.
Where long slotted holes are used in an outer ply of a preloaded connection, an external cover plate of 
sufficient size to completely cover the slot should be provided. The cover plate should be at least 8 mm thick 
and of structural material. A hardened washer should also be placed under the head or nut, whichever is 
to be turned.
6.4.6.4  Spacing and edge distance
Where oversize or slotted holes are used the hole spacing and edge distance should be checked to ensure 
that, in addition to satisfying 6.2.1 and 6.2.2, they provide the required capacity in the connected parts.
— for connections designed to be non-slip in service (PsL = 1.1KsPo):
— for connections designed to be non-slip under factored loads (PsL = 0.9KsPo):
At
is the tensile stress area, see 6.3.4.2;
Fs
is the applied shear;
Ftot
is the total applied tension in the bolt, including the calculated prying force, see 6.3.4.3;
Po
is the specified minimum preload, see BS 4604;
pt
is the tension strength of the bolt given in Table 34.
Fs
PsL
---------
Ftot
1.1Po
--------------
1

+
but
Ftot
Atpt

Fs
PsL
---------
Ftot
0.9Po
--------------
1

+
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
142
© BSI 05-2001
Section 6
Table 36 — Standard dimensions of holes for preloaded bolts
6.5  Pin connections
6.5.1  Pin connected tension members
In pin connected tension members and their connecting parts, the thickness of an unstiffened element that 
contains a hole for a pin should be not less than 25 % of the distance from the edge of the hole to the edge 
of the element, measured perpendicular to the axis of the member, see Figure 26. Where the connected 
elements are clamped together by external nuts, this limit on thickness need not be applied to internal 
plies.
The net cross-sectional area beyond a hole for a pin, in all directions within 45° of the member axis, 
see Figure 26, should be not less than the net cross-sectional area Ar required for the member. 
Perpendicular to the member axis, the net cross-sectional area each side of the hole should be not less 
than 2Ar/3.
All pins should be provided with locking devices to ensure that the pin cannot come out in service.
6.5.2  Pin plates
Pin plates that are provided to increase the net cross-sectional area of a member, or to increase the bearing 
capacity of a pin, should be arranged to avoid eccentricity and should be of sufficient size to distribute the 
load from the pin into the member.
Nominal 
diameter of 
bolt
Standard 
clearance hole
Oversize hole
Short slotted hole
Long slotted hole
Diameter
Diameter
Width
Length
Width
Length
mm
mm
mm
mm
mm
mm
mm
16
18
20
18
22
18
40
20
22
25
22
26
22
50
22
24
27
24
28
24
55
24
26
30
26
32
26
60
27
d + 3
d + 8
d + 3
d + 10
d + 3
2.5d
NOTE
d is the nominal diameter of the bolt (in mm).
Ar = Ft/py
D1  Ar/t
D2  Ar/t
D3  Ar/t
D4  0.67Ar/t
t  0.25D4
Figure 26 — Pin-ended tension members
D2
t
D     
D2
4
D     
4
D3
1
D
45º
45º
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
143
Section 6
6.5.3  Design of pins
6.5.3.1  General
The capacity of a pin connection should be determined from the shear capacity of the pin, see 6.5.3.2, and 
the bearing capacity on each connected part, see 6.5.3.3, taking due account of the distribution of load 
between the various parts. The moment in the pin should also be checked, see 6.5.3.4.
6.5.3.2  Shear capacity
The shear capacity of a pin should be taken as follows:
where
6.5.3.3  Bearing capacity
The bearing capacity of a pin should be taken as follows:
where
6.5.3.4  Bending
The moments in a pin should be calculated on the basis that the connected parts form simple supports. It 
should generally be assumed that the reactions between the pin and the connected parts are uniformly 
distributed along the length in contact on each part. Alternatively, if the thickness of one or more connected 
parts exceeds that needed to provide sufficient bearing capacity according to 6.5.3.3, the moments may be 
calculated assuming that the reactions are distributed over reduced contact lengths adjacent to the 
interfaces, based upon the minimum thicknesses needed to provide sufficient bearing capacity.
The moment capacity of the pin should be taken as follows:
where
6.6  Holding-down bolts
Holding-down bolts should be provided where necessary to resist the effects of the factored loads 
determined in accordance with 2.4. They should be designed to resist tension due to uplift forces and 
tension due to bending moments as appropriate.
Holding-down bolts required to resist tension should be anchored by a washer plate or other load 
distributing member embedded in the foundation. This plate or member should be designed to span any 
grout tube or adjustment tube provided for the holding-down bolt. Alternatively, a bend or hook in 
accordance with the minimum bend radius recommended in BS 8110 may be used.
a) if rotation is not required and the pin is not intended to be removable: 0.6pyp A
b) if rotation is required or if the pin is intended to be removable:
0.5pyp A
A
is the cross-sectional area of the pin;
pyp is the design strength of the pin.
a) if rotation is not required and the pin is not intended to be removable: 1.5pydt
b) if rotation is required or if the pin is intended to be removable:
0.8pydt
d
is the diameter of the pin;
py
is the lower of the design strengths of the pin and the connected part;
t
is the thickness of the connected part.
a) if rotation is not required and the pin is not intended to be removable: 1.5pypZ
b) if rotation is required or if the pin is intended to be removable:
1.0pypZ
pyp is the design strength of the pin;
Z
is the section modulus of the pin.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
144
© BSI 05-2001
Section 6
The tension capacity Pt of a holding-down bolt should be obtained from:
Pt  =  0.8ptAt
where
The embedded length, and the arrangement of the load distributing assembly, should be such that 
the anchorage force can be transmitted to the foundation without exceeding the load capacity of the 
foundation.
If expanding anchors or resin-grouted anchors are used, it should be demonstrated that the required 
capacity can reliably be achieved, both by the anchor and by the foundation. Rag bolts or indented 
foundation bolts that are cement-grouted into pockets cast in a concrete foundation should not be used to 
resist tension.
It should be demonstrated that there is sufficient capacity available to transmit the horizontal shear force 
between a column and a foundation by one of the following:
— the frictional resistance at the interface between the base plate and the foundation;
— the shear resistance of the holding-down bolts, allowing for the resistance of the concrete around them;
— the shear resistance of that part of the foundation surrounding the base plate;
— special elements for resisting shear force, such as block or bar shear connectors.
6.7  Welded connections
6.7.1  Through thickness tension
Where a welded connection transmits tension through the thickness of the connected part, the combination 
of the connection details, the welding procedure and the through-thickness properties of the part should be 
such as to avoid lamellar tearing.
6.7.2  Details for fillet welds
6.7.2.1  General
Where the use of intermittent fillet welds could lead to corrosion, all fillet welds should be made continuous.
6.7.2.2  End returns
Fillet welds finishing at the ends or sides of parts should be returned continuously around the corners for 
a distance of at least twice the leg length s of the weld, see Figure 27, unless access or the configuration 
renders this impracticable. In the case of fillet welds on the tension side of a connection that is subject to 
significant moments, the connection should be detailed such that end returns are practicable.
6.7.2.3  Lap joints
In lap joints, the minimum lap should be not less than 4t where t is the thickness of the thinner part joined. 
Single fillet welds should not be used except where the parts are restrained to prevent opening of the joint.
At
is the tensile stress area as specified in the appropriate bolt standard. For holding-down bolts 
where the tensile stress area is not defined, At should be taken as the area at the bottom of the  
threads;
pt
is the tension strength of the bolt obtained from Table 34.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
145
Section 6
6.7.2.4  End connections
Where the end of an element is connected only by longitudinal fillet welds, the length L of each weld should 
be not less than the transverse spacing Tw, see Figure 27.
6.7.2.5  Single fillet welds
A single fillet weld should not be subject to a bending moment about its longitudinal axis that would open 
the root of the weld.
6.7.2.6  Intermittent fillet welds
The longitudinal spacing along any one edge of the element between effective lengths of weld, as given 
in 6.8.2, should not exceed the lesser of 300 mm or 16t for compression elements or 24t for tension elements, 
where t is the thickness of the thinner part joined. The spacing of welds in back-to-back tension members 
and compression members should be as given in 4.6.3 and 4.7.13 respectively.
End runs of intermittent fillet welds should extend to the end of the part they connect.
6.7.3  Details for structural hollow sections (SHS)
6.7.3.1  Butt joints
A weld connecting two structural hollow sections directly end-to-end should be a full penetration butt weld.
6.7.3.2  End connections
A weld connecting the end of an SHS to the surface of another member should be continuous, and may be 
either:
— a butt weld throughout;
— a fillet weld throughout;
— a fillet weld in one part and a butt weld in another, with a continuous transition from one to the other.
6.7.3.3  Joint layout
Joints at which two or more SHS are connected to a larger member (either an SHS or another type) should 
be set out so that the connected members either form an overlap joint with sufficient overlap to transfer 
the forces between the members, or a gap joint with sufficient clearance between the welds connecting each 
member. Where necessary, eccentricity should be introduced between the intersections of the members in 
order to achieve this.
NOTE   Information on the design of overlap and gap joints for SHS members, including the effects of eccentricity is given 
in DD ENV 1993-1-1/A1, see Bibliography.
NOTE   See also 6.7.2.1.
Figure 27 — Welded end connections
L
w
T   
Weld stopped
short
L >Tw
s
2s min.
_
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
146
© BSI 05-2001
Section 6
6.7.3.4  Joint design
All welded connections of SHS to the surface of another member should be investigated to ensure that the 
stiffness and strength of the connection are sufficient to transmit the forces in the connected members, 
without causing weld failure due to significant non-uniform distribution of stresses in the connection, 
forming local yield-line mechanisms or developing excessive punching shear in the member to which they 
are connected.
NOTE   Information on joint design for SHS is given in DD ENV 1993-1-1/A1, see Bibliography.
6.7.4  Partial penetration butt welds
Intermittent partial penetration butt welds should not be used.
6.7.5  Welded connections to unstiffened flanges
Where a plate (or beam flange) is welded to an unstiffened flange of an I- or H-section column (or other 
member), see Figure 28, the applied force Fx perpendicular to the flange should not exceed Px calculated 
from the following:
where
The welds connecting a plate (or beam flange) to an unstiffened flange of an I- or H-section column should 
be of uniform size throughout, but should be designed to resist the applied force Fx assuming this to be 
concentrated over an effective breadth be of the flange, as shown in Figure 28, given by:
If be is less than 0.5(Fx /Px)bp, where bp is the overall width of the plate (or beam flange), the flange of the 
column (or other member) should be stiffened even if Fx does not exceed Px.
— for a rolled I- or H-section column:
Px = [4
Tc2 + (tc + 1.6rc)tp]pyc
 but
 Px  (5Tc + tc + 1.6rc)tppyp
— for a welded I or H-section column:
Px = [4
Tc2 + (tc + 1.6sc)tp]pyc
 but
 Px  (5Tc + tc + 1.6sc)tppyp
pyc
is the design strength of the flange of the column;
pyp
is the design strength of the connected plate;
rc
is the root radius of a rolled I- or H-section column;
sc
is the leg size of the web-to-flange welds of a welded I- or H- column;
Tc
is the flange thickness of the column;
tc
is the web thickness of the column;
tp
is the thickness of the connected plate (or beam flange).
2
2
be
Px
tppyp
-------------
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
147
Section 6
6.8  Design of fillet welds
6.8.1  Angle of intersection
The angle of intersection of members connected by fillet welds should be such that the angle between the 
fusion faces of a weld is not less than 60° and not more than 120°. Outside these limits the adequacy of the 
connection should be determined on the basis of tests in accordance with Section 7.
6.8.2  Effective length
The effective length of a fillet weld should be taken as the length over which the fillet is full size. In the 
absence of better information this may be taken as equal to the overall length, less one leg length s for each 
end that does not continue around a corner. A fillet weld with an effective length less than 4s or less than 
40 mm should not be used to carry load.
6.8.3  Throat size
The effective throat size a of a fillet weld should be taken as the perpendicular distance from the root of the 
weld to a straight line joining the fusion faces that lies just within the cross-section of the weld,      
see Figure 29.
Figure 28 — Welded connection to an unstiffened flange
tp
b   
b   
b    
e
e
p
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
148
© BSI 05-2001
Section 6
6.8.4  Deep penetration fillet welds
Where deep penetration fillet welds are produced by submerged arc welding or similar methods, with a 
depth of penetration p to the minimum depth of fusion (see Figure 30) of at least 2 mm, provided that it can 
be shown that the required penetration can consistently be achieved, the effective throat size a should be 
measured to the minimum depth of fusion as shown in Figure 30.
6.8.5  Design strength
Fillet welds should be made using electrodes or other welding consumables with a specified Charpy impact 
value equivalent to, or better than, that specified for the parent metal. The design strength pw of a fillet 
weld should be determined from Table 37, corresponding to the electrode classification and the steel grade, 
or the lower grade for connections between different steel grades.
a) Equal leg fillet
b) Unequal leg fillet
c) Acute angled fillet
d) Obtuse angled fillet
Figure 29 — Effective throat size a of a fillet weld
Figure 30 — Deep penetration fillet weld
a
a
1
2
a
a
s 
s
s  
s
s  
s  
s
s
a  
p
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
149
Section 6
Table 37 — Design strength of fillet welds pw
6.8.6  Design stress
The force per unit length transmitted by a fillet weld at a given point in its length should be determined 
from the applied forces and moments, using the elastic section properties of the weld or weld group, based 
on effective throat sizes, see 6.8.3. The design stress in a fillet weld should be calculated as the force per 
unit length transmitted by the weld, divided by the effective throat size a.
6.8.7  Capacity of a fillet weld
6.8.7.1  General
Provided that the effective throat size a of a fillet weld does not exceed 0.7s, where s is the length of the 
smaller leg for a plain fillet weld or the smaller fusion face for any other case, its capacity should be checked 
using either 6.8.7.2 or 6.8.7.3. If a > 0.7s its capacity should either be checked taking a as equal to 0.7s or 
alternatively as a butt weld, see 6.9.3.
6.8.7.2  Simple method
The capacity should be taken as sufficient if throughout the length of the weld the vector sum of the design 
stresses due to all forces and moments transmitted by the weld does not exceed its design strength pw, 
see 6.8.5.
6.8.7.3 Directional method
Alternatively to 6.8.7.2, the forces per unit length transmitted by the weld may be resolved into a 
longitudinal shear FL parallel to the axis of the weld, see Figure 31a), and a resultant transverse force FT 
perpendicular to this axis, see Figure 31b).
The longitudinal shear capacity PL per unit length of weld should be taken as:
PL  =  pwa
The transverse capacity PT per unit length of weld, in a direction at an angle  to the weld throat, should 
be taken as:
PT  =  KPL
Throughout its length, the weld should satisfy the following relationship:
(FL/PL)2 + (FT /PT)2  1 
The coefficient K should be obtained from:
in which  is the angle between the force FT and the throat of the weld, see Figure 31c).
NOTE   For a transverse force parallel to one leg of an equal leg fillet weld that connects two elements that are at right 
angles to each other,  = 45° and K = 1.25.
Steel grade
Electrode classification
(see Table 10)
For other types of electrode and/or other steel grades:
35
42
50
pw = 0.5Ue but pw  0.55Us
N/mm2
N/mm2
N/mm2
where
S 275
220
(220)a
(220)a
Ue is the minimum tensile strength of the electrode, 
as specified in the relevant product standard;
S 355
(220)b
250
(250)a
Us is the specified minimum tensile strength of the 
parent metal.
S 460
(220)b
(250)b
280
a Over-matching electrodes.
b Under-matching electrodes. Not to be used for partial penetration butt welds.
K
1.25
1.5
1

2
cos
+
------------------------
=
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 29 — Minimum Edge and End Distances


BS 5950-1:2000
132
© BSI 05-2001
Section 6
6.2.1.2  Maximum spacing in unstiffened plates
Where a plate is not stiffened by a web or outstand, the spacing between centres of adjacent bolts in a line 
lying in the direction of stress should not exceed 14t, where t is the thickness of the thinner element. If it 
is exposed to corrosive influences, the maximum spacing of bolts in each of two directions at right angles 
should not exceed the lesser of 16t or 200 mm, where t is the thickness of the thinner outside ply.
6.2.2  Edge and end distances
6.2.2.1  General
For standard clearance holes, and for holes for fitted bolts, the edge distance should be taken as the 
distance from the centre of the hole to the adjacent edge, measured perpendicular to the direction of stress. 
The end distance should be taken as the distance from the centre of the hole to the adjacent edge, measured 
in the direction in which the bolt bears. The end distance should also be sufficient to provide adequate 
bearing capacity, see 6.3.3.3 and 6.4.4.
6.2.2.2  Slotted holes
For slotted holes, edge and end distances should be measured from the edge or end of the material to the 
centre of its end radius or to the centreline of the slot, see Figure 21.
6.2.2.3  Oversize holes
For oversize holes, the edge and end distances should be taken as the distance from the relevant edge, 
see 6.2.2.1, less half the nominal diameter of the oversize hole, plus half the diameter D of a standard 
clearance hole.
6.2.2.4  Minimum edge or end distance
The distance from the centre of a bolt hole to the edge or end of any part should be not less than the value 
given in Table 29.
6.2.2.5  Maximum edge or end distance
Where parts are connected by bolts, the distance from an unstiffened edge to the nearest line of bolts should 
not exceed 11t. This does not apply to bolts interconnecting the components of back-to-back tension 
members, see 4.6.3. Where the parts are exposed to corrosive influences, the edge distance should not 
exceed 40 mm + 4t.
Figure 21 — Minimum edge and end distances
e = end or edge distance
e = end or edge distance
e  
e
e
D  
D  
e  
e
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
133
Section 6
Table 29 — Minimum edge and end distances of bolts
6.2.3  Effect of bolt holes on shear capacity
Bolt holes need not be allowed for in the shear area provided that:
Av.net  0.85Av/Ke
If Av.net is less than 0.85Av/Ke the net shear capacity should be taken as 0.7pyKeAv.net.
6.2.4  Block shear
Block shear failure through a group of bolt holes at a free edge, see Figure 22, (consisting of failure in shear 
at the row of bolt holes along the shear face of the hole group, accompanied by tensile rupture along the 
line of bolt holes on the tension face of the hole group, see Figure 22) should be prevented by checking that 
the reaction Fr does not exceed the block shear capacity Pr determined from:
Pr = 0.6pyt[Lv + Ke(Lt – kDt)]
Quality of cut
Edge and end distances
For a rolled, machine flame cut, sawn or planed edge or end
1.25D
For a sheared or hand flame cut edge or end
1.40D
NOTE
D is the diameter of a standard clearance hole for a bolt of the relevant nominal diameter, see Table 33.
where
Av.net
is the net shear area after deducting bolt holes;
Ke
is the effective net area coefficient from 3.4.3.
where
Dt
is the hole size for the tension face, generally the hole diameter, but for slotted holes the 
dimension perpendicular to the direction of load transfer should be used;
k
is a coefficient with values as follows:
— for a single line of bolts: k = 0.5;
— for two lines of bolts: 
k = 2.5;
Lt
is the length of the tension face, see Figure 22;
Lv
is the length of the shear face, see Figure 22;
t
is the thickness.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
134
© BSI 05-2001
Section 6
6.3  Non-preloaded bolts
6.3.1  Effective areas of bolts
Bolts may have short, standard or long thread lengths, or have fully threaded shanks. The shear area As 
of a bolt should normally be taken as the tensile stress area  At as specified in the appropriate bolt standard. 
For bolts without a defined tensile stress area, At should be taken as the area at the bottom of the threads.
Where it can be shown that threads do not occur in the shear plane, As may be taken as the shank area A. 
In the calculation of thread length, allowance should be made for tolerances and the thread run off.
6.3.2  Shear capacity
6.3.2.1  General
Provided that no reduction is required for the effect of packing (see 6.3.2.2), large grips (see 6.3.2.3), 
kidney-shaped slots (see 6.3.2.4), or long joints (see 6.3.2.5), the shear capacity Ps of a bolt should be taken 
as:
Ps  =  psAs
Figure 22 — Block shear — Effective shear area
where
As is the shear area (A or At) as defined in 6.3.1;
ps
is the shear strength obtained from Table 30.
Lt
r
v
F
Lt
Lv
Lv
r
F
rF
v
L
L 
rF
Lt
Lt
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 30 — Design Shear Strength ps


BS 5950-1:2000
134
© BSI 05-2001
Section 6
6.3  Non-preloaded bolts
6.3.1  Effective areas of bolts
Bolts may have short, standard or long thread lengths, or have fully threaded shanks. The shear area As 
of a bolt should normally be taken as the tensile stress area  At as specified in the appropriate bolt standard. 
For bolts without a defined tensile stress area, At should be taken as the area at the bottom of the threads.
Where it can be shown that threads do not occur in the shear plane, As may be taken as the shank area A. 
In the calculation of thread length, allowance should be made for tolerances and the thread run off.
6.3.2  Shear capacity
6.3.2.1  General
Provided that no reduction is required for the effect of packing (see 6.3.2.2), large grips (see 6.3.2.3), 
kidney-shaped slots (see 6.3.2.4), or long joints (see 6.3.2.5), the shear capacity Ps of a bolt should be taken 
as:
Ps  =  psAs
Figure 22 — Block shear — Effective shear area
where
As is the shear area (A or At) as defined in 6.3.1;
ps
is the shear strength obtained from Table 30.
Lt
r
v
F
Lt
Lv
Lv
r
F
rF
v
L
L 
rF
Lt
Lt
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
135
Section 6
Table 30 — Shear strength of bolts
6.3.2.2  Packing
The total thickness of steel packing tpa at a shear plane should not exceed 4d/3, where d is the nominal 
diameter of the bolts. For multiple packs, the number of plies should preferably not exceed four.            
Where tpa exceeds d/3 the shear capacity Ps should be taken as:
but not more than given in 6.3.2.3 for large grip lengths or 6.3.2.5. for long joints.
6.3.2.3  Large grip lengths
Where the grip length Tg (i.e. the total thickness of the connected plies) exceeds 5d, where d is the nominal 
diameter of the bolts, the shear capacity Ps should be taken as:
but not more than given in 6.3.2.2 for the effect of packing or 6.3.2.5. for long joints.
6.3.2.4  Kidney-shaped slots
Where a connection has two bolts, one in a standard clearance hole and one in a kidney-shaped slot, 
see 6.3.3.3, the shear capacity of each bolt should be taken as 0.8Ps.
6.3.2.5  Long joints
Where the lap length Lj of a splice or connection transferring tension or compression with more than two 
rows of bolts (i.e. the distance between the first and last rows of bolts, measured in the direction of load 
transfer, see Figure 23) exceeds 500 mm, the shear capacity Ps should be taken as:
but not more than given in 6.3.2.2 for the effect of packing or 6.3.2.3 for large grip lengths.
Bolt grade
Shear strength ps (N/mm2)
4.6
160
8.8
375
10.9
400
General grade HSFG
M24
400
to BS 4395-1
M27
350
Higher grade HSFG to BS 4395-2
400
Other grades (Ub  1000 N/mm2)
0.4Ub 
Ub is the specified minimum tensile strength of the bolt.
Figure 23 — Lap length of a splice
Ps
psAs
9d
8d
3tpa
+
------------------------




=
Ps
psAs
8d
3d
Tg 
+
---------------------




=
Ps
psAs
5 500
Lj
–
5 000
---------------------------




=
L j
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
136
© BSI 05-2001
Section 6
6.3.3  Bearing capacity
6.3.3.1  General
The bearing capacity of a bolt on any connected part should be taken as the lesser of the bearing capacity 
Pbb of the bolt (see 6.3.3.2) and the bearing capacity Pbs of the part (see 6.3.3.3).
6.3.3.2  Bearing capacity of bolt
The bearing capacity of the bolt itself should be taken as:
Pbb = dtppbb
where
Table 31 — Bearing strength of bolts
6.3.3.3  Bearing capacity of connected part
The bearing capacity Pbs of the connected part should be taken as follows:
where
Table 32 — Bearing strength pbs of connected parts
Provided that the sizes of the holes for non-preloaded bolts do not exceed the standard dimensions given in 
Table 33, the coefficient kbs allowing for the type of hole should be taken as follows:
d
is the nominal diameter of the bolt;
pbb is the bearing strength of the bolt, obtained from Table 31;
tp
is the thickness of the connected part, or, if the bolts are countersunk, the thickness of the part 
minus half the depth of countersinking.
Bolt grade
Bearing strength pbb (N/mm2)
4.6
460
8.8
1000
10.9
1300
General grade HSFG
M24
1000
to BS 4395-1
M27
900
Higher grade HSFG to BS 4395-2
1300
Other grades (Ub  1000 N/mm2)
0.7(Ub + Yb)
NOTE 1
Ub is the specified minimum tensile strength of the bolt.
NOTE 2
Yb  is the specified minimum yield strength of the bolt.
e
is the end distance, as defined in 6.2.2.1;
pbs is the bearing strength of the connected part, see Table 32.
Steel grade
S 275
S 355
S 460
Other grades
Bearing strength pbs (N/mm2)
460
550
670
0.67(US + YS)
NOTE 1
Us  is the specified minimum tensile strength of the steel.
NOTE 2
Ys  is the specified minimum yield strength of the steel.
— for bolts in standard clearance holes: kbs  =  1.0
— for bolts in oversized holes:
kbs  =  0.7
— for bolts in short slotted holes:
kbs  =  0.7
— for bolts in long slotted holes:
kbs  =  0.5
— for bolts in kidney-shaped slots:
kbs  =  0.5
Pbs
kbsdtppbs
=
but
Pbs
0.5kbsetppbs

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 31 — Design Tension Strength pt


BS 5950-1:2000
136
© BSI 05-2001
Section 6
6.3.3  Bearing capacity
6.3.3.1  General
The bearing capacity of a bolt on any connected part should be taken as the lesser of the bearing capacity 
Pbb of the bolt (see 6.3.3.2) and the bearing capacity Pbs of the part (see 6.3.3.3).
6.3.3.2  Bearing capacity of bolt
The bearing capacity of the bolt itself should be taken as:
Pbb = dtppbb
where
Table 31 — Bearing strength of bolts
6.3.3.3  Bearing capacity of connected part
The bearing capacity Pbs of the connected part should be taken as follows:
where
Table 32 — Bearing strength pbs of connected parts
Provided that the sizes of the holes for non-preloaded bolts do not exceed the standard dimensions given in 
Table 33, the coefficient kbs allowing for the type of hole should be taken as follows:
d
is the nominal diameter of the bolt;
pbb is the bearing strength of the bolt, obtained from Table 31;
tp
is the thickness of the connected part, or, if the bolts are countersunk, the thickness of the part 
minus half the depth of countersinking.
Bolt grade
Bearing strength pbb (N/mm2)
4.6
460
8.8
1000
10.9
1300
General grade HSFG
M24
1000
to BS 4395-1
M27
900
Higher grade HSFG to BS 4395-2
1300
Other grades (Ub  1000 N/mm2)
0.7(Ub + Yb)
NOTE 1
Ub is the specified minimum tensile strength of the bolt.
NOTE 2
Yb  is the specified minimum yield strength of the bolt.
e
is the end distance, as defined in 6.2.2.1;
pbs is the bearing strength of the connected part, see Table 32.
Steel grade
S 275
S 355
S 460
Other grades
Bearing strength pbs (N/mm2)
460
550
670
0.67(US + YS)
NOTE 1
Us  is the specified minimum tensile strength of the steel.
NOTE 2
Ys  is the specified minimum yield strength of the steel.
— for bolts in standard clearance holes: kbs  =  1.0
— for bolts in oversized holes:
kbs  =  0.7
— for bolts in short slotted holes:
kbs  =  0.7
— for bolts in long slotted holes:
kbs  =  0.5
— for bolts in kidney-shaped slots:
kbs  =  0.5
Pbs
kbsdtppbs
=
but
Pbs
0.5kbsetppbs

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 32 — Design Bearing Strength pbs


BS 5950-1:2000
© BSI 05-2001
137
Section 6
Table 33 — Standard dimensions of holes for non-preloaded bolts
6.3.4  Bolts subject to tension
6.3.4.1 General
The tension capacity of a connection using bolts (including 90º countersunk head bolts) should be checked 
using one of the following methods:
— the simple method given in 6.3.4.2;
— the more exact method given in 6.3.4.3.
6.3.4.2  Simple method
The simple method may be used if the connection satisfies both of the following:
— the cross-centre spacing of the bolt lines should not exceed 55 % of the flange width or end-plate width, 
see Figure 24;
— if a connected part is designed assuming double curvature bending, see Figure 25b), its moment 
capacity per unit width should be taken as pytp2/6, where tp is the thickness of the connected part.
In the simple method the prying force need not be calculated. The tensile force per bolt Ft transmitted by 
the connection should not exceed the nominal tension capacity Pnom of the bolt, obtained from:
Pnom  =  0.8ptAt
where
Nominal 
diameter of 
bolt
Standard 
clearance 
hole
Oversize holea
Short slotted hole
Long slotted holeb
Kidney-shaped slot
Diameter
Diameter
Width
Length
Width
Length
Width
Length
mm
mm
mm
mm
mm
mm
mm
mm
mm
12
13
16
13
16
13
42
13
36
16
18
20
18
22
18
56
18
48
20
22
25
22
26
22
70
22
60
22
24
27
24
28
24
77
24
66
24
26
30
26
32
26
84
26
72
27
d + 3
d + 8
d + 3
d + 10
d + 3
3.5d
d + 3
3.0d
NOTE
d is the nominal diameter of the bolt (in mm).
a Larger diameter holes may be used for holding-down bolts.
b Longer slots may be used for expansion joints.
At is the tensile stress area as specified in the appropriate bolt standard. For bolts where the tensile 
stress area is not defined, At should be taken as the area at the bottom of the threads;
pt is the tension strength of the bolt obtained from Table 34.
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Table 34 — Clearances for Ordinary Bolts (Hole Tolerances)


BS 5950-1:2000
138
© BSI 05-2001
Section 6
Table 34 — Tension strength of bolts
6.3.4.3   More exact method
The more exact method may be used for a connection in which both of the connected parts satisfy one or 
more of the following:
a) the connected part spans between two or more supporting parts;
b) the outstand of the connected part is designed assuming single curvature bending, see Figure 25a);
c) the outstand of the connected part is designed assuming double curvature bending, see Figure 25b), 
and the resulting prying force Q is calculated and included in the total applied tension Ftot in the bolt;
d) the connected part spans between two or more supporting parts in one direction, but acts as an 
outstand in the other direction, and the resulting prying force Q is calculated and included in the total         
applied tension Ftot in the bolt.
NOTE
In cases a) and b) no prying force is necessary for equilibrium.
In the more exact method the moment capacity per unit width of the connected part should be taken as 
pytp2/4 and the total applied tension Ftot in the bolt, including the calculated prying force, should not exceed 
the tension capacity Pt obtained from:
Pt  =  pt At
Figure 24 — Maximum cross-centres of bolt lines for the simple method
Bolt grade
Tension strength pt (N/mm2)
4.6
240
8.8
560
10.9
700
General grade HSFG
M24
590
to BS 4395-1
M27
515
Higher grade HSFG to BS 4395-2
700
Other grades (Ub  1000 N/mm2)
0.7Ub but  Yb
NOTE 1
Ub is the specified minimum tensile strength of the bolt.
NOTE 2
Yb  is the specified minimum yield strength of the bolt.
s
B
s < 0,55B
_
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
© BSI 05-2001
139
Section 6
6.3.4.4  Combined shear and tension
Bolts that are subject to shear Fs as well as tension should, in addition to the conditions given in 6.3.1 
to 6.3.4.3, satisfy the following:
where
6.4  Preloaded bolts
6.4.1  General
Depending on the reason for adopting preloading, a connection using preloaded HSFG bolts should be 
designed as one of the following:
a) a normal “bearing type” connection;
b) non-slip in service;
c) non-slip under factored loads.
In case a) the preloaded bolts should be designed in the same way as non-preloaded bolts, see 6.3.
For cases b) and c) the slip resistance should be checked as recommended in 6.4.2 and 6.4.5.
In case b) the shear capacity and bearing capacity after slipping should also be checked, see 6.4.4.
NOTE   The resistance of a friction grip connection to slip in service is a serviceability criterion, but for ease of use it is presented in 
a modified form, suitable for checking under factored loads.
a) Single curvature bending                         
b) Double curvature bending
Figure 25 — Design of outstands
— for the simple method:
— for the more exact method:
Ps
is the shear capacity, see 6.3.2.
2Ft
M
M
Q
Q
tF  + Q
tF  + Q
M2
1
1
M2
Ft
2Ft
Ft
M
M
1
1
Fs
Ps
-----
Ft
Pnom
-------------
1.4

+
Fs
Ps
-----
Ftot
Pt
---------
1.4

+
Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C

BS 5950-1:2000
140
© BSI 05-2001
Section 6
6.4.2  Slip resistance
The slip resistance PsL of a preloaded bolt should be determined as follows:
— for connections designed to be non-slip in service:
PsL  =  1.1KsPo
— for connections designed to be non-slip under factored loads:
PsL  =  0.9 KsPo
where
The coefficient Ks allowing for the type of hole should be taken as follows:
Connections with preloaded bolts in long slotted holes, loaded parallel to the slot, should always be 
designed to be case c) non-slip under factored loads, i.e. using PsL = 0.9KsPo not 1.1 KsPo.
If waisted-shank HSFG bolts are used, the connection should always be designed to be case c) non-slip 
under factored loads, i.e. using PsL = 0.9KsPo not 1.1KsPo.
6.4.3  Slip factor
The slip factor  should be obtained from Table 35. Alternatively, it may be determined from the results of 
tests as specified in BS 4604.
Table 35 — Slip factors for preloaded bolts
6.4.4  Capacity after slipping
For friction grip connections designed to be non-slip in service, case b) of 6.4.1, the slip resistance PsL 
should not be taken as more than the shear capacity Ps determined from 6.3.2, nor more than the friction 
grip bearing capacity Pbg given by:
where pbs is the bearing strength of connected parts from Table 32 and d, e and tp are as given in 6.3.3.
NOTE   This bearing capacity applies only to preloaded bolts designed to be non-slip in service, case b) of  6.4.1. For the bearing 
capacity of preloaded bolts in bearing type connections see 6.3.3.
Po is the minimum shank tension as specified in BS 4604;

is the slip factor.
— for preloaded bolts in standard clearance holes:
Ks  =  1.0;
— for preloaded bolts in oversized holes or short slotted holes:
Ks  =  0.85;
— for preloaded bolts in long slotted holes, loaded perpendicular to the slot:
Ks  = 0.85;
— for preloaded bolts in long slotted holes, loaded parallel to the slot:
Ks  =  0.7.
Class
Condition of faying surfaces
Slip factor

Preparation
Treatment
A
Blasted with shot or grit
Loose rust removed, no pitting
0.5
Spray metallized with aluminium
Spray metallized with a zinc based coating that has 
been demonstrated to provide a slip factor of at 
least 0.5
B
Blasted with shot or grit
Spray metallized with zinc
0.4
C
Wire brushed
Loose rust removed, tight mill scale
0.3
Flame cleaned
D
Untreated
Untreated
0.2
Galvanized
Pbg
1.5dtppbs
=
but
Pbg
0.5etppbs

Licensed Copy: Giorgio Cavalieri, ALSTOM                                                                                                                          , July 17, 2001, Uncontrolled C


---
## Appendix H — Bolt Tensile Stress Areas




---
_End of BS 5950-1:2000 extracted context_
