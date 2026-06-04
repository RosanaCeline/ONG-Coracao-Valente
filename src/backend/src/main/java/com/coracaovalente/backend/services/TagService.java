package com.coracaovalente.backend.services;

import com.coracaovalente.backend.exception.TagAlreadyExistsException;
import com.coracaovalente.backend.exception.TagNotFoundException;
import com.coracaovalente.backend.model.animal.Tag;
import com.coracaovalente.backend.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    @Transactional
    public Tag createTag (String name) {
        String normalizedName = capitalize(name.trim());

        if (tagRepository.existsByNameIgnoreCase(normalizedName))
            throw new TagAlreadyExistsException("Tag '" + name + "' já existe");

        return tagRepository.save(new Tag(null, normalizedName));
    }

    @Transactional
    public void deleteTag (Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(TagNotFoundException::new);

        tagRepository.deleteById(tag.getId());
    }

    private String capitalize(String text) {
        if (text == null || text.isEmpty()) return text;
        return Character.toUpperCase(text.charAt(0)) + text.substring(1).toLowerCase();
    }
}
