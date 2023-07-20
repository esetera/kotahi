ALTER TABLE cms_layouts
ADD COLUMN group_id UUID REFERENCES groups(id);

ALTER TABLE cms_pages
ADD COLUMN group_id UUID REFERENCES groups(id);