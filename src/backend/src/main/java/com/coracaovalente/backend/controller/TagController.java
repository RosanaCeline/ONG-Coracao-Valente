package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.TagControllerDocs;
import com.coracaovalente.backend.model.animal.Tag;
import com.coracaovalente.backend.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tag")
@RequiredArgsConstructor
public class TagController implements TagControllerDocs {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<Tag> createTag (@RequestParam String name) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tagService.createTag(name));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Tag>> getTags () {
        return ResponseEntity.ok().body(tagService.getTags());
    }
}
